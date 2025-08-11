import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  loginSchema, 
  registerSchema, 
  insertUserCenterSchema,
  type User 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken" });
      }

      // Create user
      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json({ 
        message: "User created successfully", 
        user: userWithoutPassword 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginData = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(loginData.email);
      if (!user || user.password !== loginData.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json({ 
        message: "Login successful", 
        user: userWithoutPassword,
        token: "mock-jwt-token" // In real app, generate actual JWT
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // DTLC Centers routes
  app.get("/api/centers", async (req, res) => {
    try {
      const centers = await storage.getAllCenters();
      res.json(centers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch centers" });
    }
  });

  app.get("/api/centers/:id", async (req, res) => {
    try {
      const center = await storage.getCenterById(req.params.id);
      if (!center) {
        return res.status(404).json({ message: "Center not found" });
      }
      res.json(center);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch center" });
    }
  });

  // User Centers routes
  app.get("/api/user-centers/:userId", async (req, res) => {
    try {
      const userCenters = await storage.getUserCenters(req.params.userId);
      
      // Get full center details
      const centersWithDetails = await Promise.all(
        userCenters.map(async (uc) => {
          const center = await storage.getCenterById(uc.centerId);
          return { ...uc, center };
        })
      );
      
      res.json(centersWithDetails);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user centers" });
    }
  });

  app.post("/api/user-centers", async (req, res) => {
    try {
      const userCenterData = insertUserCenterSchema.parse(req.body);
      const userCenter = await storage.addUserCenter(userCenterData);
      res.status(201).json(userCenter);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add center" });
    }
  });

  app.delete("/api/user-centers/:userId/:centerId", async (req, res) => {
    try {
      const success = await storage.removeUserCenter(req.params.userId, req.params.centerId);
      if (!success) {
        return res.status(404).json({ message: "User center not found" });
      }
      res.json({ message: "Center removed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove center" });
    }
  });

  // Notifications routes
  app.get("/api/notifications/:userId", async (req, res) => {
    try {
      const notifications = await storage.getUserNotifications(req.params.userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      const success = await storage.markNotificationRead(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update notification" });
    }
  });

  // Notification stats route
  app.get("/api/notifications/sent-count", async (req, res) => {
    try {
      const stats = await storage.getNotificationStats();
      res.json({ totalSent: stats.totalSent });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notification stats" });
    }
  });

  // User profile routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const updates = req.body;
      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
