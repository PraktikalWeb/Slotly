import { 
  type User, 
  type InsertUser, 
  type DtlcCenter, 
  type InsertDtlcCenter,
  type UserCenter,
  type InsertUserCenter,
  type Notification,
  type InsertNotification,
  type NotificationStats
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // DTLC Center methods
  getAllCenters(): Promise<DtlcCenter[]>;
  getCenterById(id: string): Promise<DtlcCenter | undefined>;
  createCenter(center: InsertDtlcCenter): Promise<DtlcCenter>;
  updateCenter(id: string, updates: Partial<DtlcCenter>): Promise<DtlcCenter | undefined>;

  // User Center preferences
  getUserCenters(userId: string): Promise<UserCenter[]>;
  addUserCenter(userCenter: InsertUserCenter): Promise<UserCenter>;
  removeUserCenter(userId: string, centerId: string): Promise<boolean>;

  // Notifications
  getUserNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationRead(id: string): Promise<boolean>;

  // Notification stats
  getNotificationStats(): Promise<NotificationStats>;
  incrementNotificationCount(): Promise<NotificationStats>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private dtlcCenters: Map<string, DtlcCenter>;
  private userCenters: Map<string, UserCenter>;
  private notifications: Map<string, Notification>;
  private notificationStats: NotificationStats;

  constructor() {
    this.users = new Map();
    this.dtlcCenters = new Map();
    this.userCenters = new Map();
    this.notifications = new Map();
    this.notificationStats = {
      id: randomUUID(),
      totalSent: 24847,
      lastUpdated: new Date(),
    };

    // Initialize with some South African DTLC centers
    this.initializeCenters();
  }

  private initializeCenters() {
    const centers: DtlcCenter[] = [
      {
        id: randomUUID(),
        name: "Sandton DTLC",
        location: "Sandton",
        province: "Gauteng",
        available: Math.random() > 0.5,
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Centurion DTLC",
        location: "Centurion",
        province: "Gauteng",
        available: Math.random() > 0.5,
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Cape Town DTLC",
        location: "Cape Town",
        province: "Western Cape",
        available: Math.random() > 0.5,
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Durban DTLC",
        location: "Durban",
        province: "KwaZulu-Natal",
        available: Math.random() > 0.5,
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Johannesburg DTLC",
        location: "Johannesburg",
        province: "Gauteng",
        available: Math.random() > 0.5,
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Pretoria DTLC",
        location: "Pretoria",
        province: "Gauteng",
        available: Math.random() > 0.5,
        lastUpdated: new Date(),
      },
    ];

    centers.forEach(center => {
      this.dtlcCenters.set(center.id, center);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllCenters(): Promise<DtlcCenter[]> {
    return Array.from(this.dtlcCenters.values());
  }

  async getCenterById(id: string): Promise<DtlcCenter | undefined> {
    return this.dtlcCenters.get(id);
  }

  async createCenter(insertCenter: InsertDtlcCenter): Promise<DtlcCenter> {
    const id = randomUUID();
    const center: DtlcCenter = {
      ...insertCenter,
      id,
      lastUpdated: new Date(),
    };
    this.dtlcCenters.set(id, center);
    return center;
  }

  async updateCenter(id: string, updates: Partial<DtlcCenter>): Promise<DtlcCenter | undefined> {
    const center = this.dtlcCenters.get(id);
    if (!center) return undefined;
    
    const updatedCenter = { ...center, ...updates, lastUpdated: new Date() };
    this.dtlcCenters.set(id, updatedCenter);
    return updatedCenter;
  }

  async getUserCenters(userId: string): Promise<UserCenter[]> {
    return Array.from(this.userCenters.values()).filter(uc => uc.userId === userId);
  }

  async addUserCenter(insertUserCenter: InsertUserCenter): Promise<UserCenter> {
    const id = randomUUID();
    const userCenter: UserCenter = {
      ...insertUserCenter,
      id,
      createdAt: new Date(),
    };
    this.userCenters.set(id, userCenter);
    return userCenter;
  }

  async removeUserCenter(userId: string, centerId: string): Promise<boolean> {
    for (const [id, userCenter] of this.userCenters.entries()) {
      if (userCenter.userId === userId && userCenter.centerId === centerId) {
        this.userCenters.delete(id);
        return true;
      }
    }
    return false;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(n => n.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = {
      ...insertNotification,
      id,
      createdAt: new Date(),
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async markNotificationRead(id: string): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (!notification) return false;
    
    const updated = { ...notification, read: true };
    this.notifications.set(id, updated);
    return true;
  }

  async getNotificationStats(): Promise<NotificationStats> {
    return this.notificationStats;
  }

  async incrementNotificationCount(): Promise<NotificationStats> {
    this.notificationStats = {
      ...this.notificationStats,
      totalSent: this.notificationStats.totalSent + 1,
      lastUpdated: new Date(),
    };
    return this.notificationStats;
  }
}

export const storage = new MemStorage();
