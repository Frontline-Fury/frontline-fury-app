// Models - Data structures with TypeScript interfaces

interface BattalionMember {
    userId: string;
    rank: 'commander' | 'lieutenant' | 'sergeant' | 'soldier';
    joinedAt: number;
  }
  
  interface BattalionObjective {
    title: string;
    description: string;
    coordinates?: { latitude: number; longitude: number };
    qrCode?: string;
    completed: boolean;
    assignedAt: number;
    completedAt?: number;
  }
  
  interface ChatMessage {
    userId: string;
    text: string;
    timestamp: number;
  }
  
  interface Achievement {
    id: string;
    name: string;
    description: string;
    iconUrl: string;
    earnedAt?: number;
  }
  
  interface EventAttendee {
    userId: string;
    status: 'confirmed' | 'maybe' | 'declined';
    joinedAt?: number;
  }
  
  // Battalion Model
  class Battalion {
    id: string;
    name: string;
    emblem: string; // URL to image
    privacy: 'open' | 'application' | 'invite-only';
    motto: string;
    commanderId: string;
    members: BattalionMember[];
    squads: Squad[];
    events: Event[];
    createdAt: number;
    level: number;
    xp: number;
    achievements: Achievement[];
    status: 'active' | 'disbanded';
  
    constructor(
      id: string, 
      name: string, 
      emblem: string, 
      privacy: 'open' | 'application' | 'invite-only', 
      motto: string, 
      commanderId: string
    ) {
      this.id = id;
      this.name = name;
      this.emblem = emblem;
      this.privacy = privacy;
      this.motto = motto || "";
      this.commanderId = commanderId;
      this.members = [];
      this.squads = [];
      this.events = [];
      this.createdAt = Date.now();
      this.level = 1;
      this.xp = 0;
      this.achievements = [];
      this.status = 'active';
    }
  
    // Battalion methods
    addMember(userId: string, rank: BattalionMember['rank'] = "soldier"): void {
      this.members.push({ userId, rank, joinedAt: Date.now() });
    }
  
    removeMember(userId: string): void {
      this.members = this.members.filter(member => member.userId !== userId);
    }
  
    promoteMember(userId: string, newRank: BattalionMember['rank']): boolean {
      const member = this.members.find(member => member.userId === userId);
      if (member) {
        member.rank = newRank;
        return true;
      }
      return false;
    }
  
    createSquad(name: string, leaderId: string): Squad {
      const squad = new Squad(generateId(), name, this.id, leaderId);
      this.squads.push(squad);
      return squad;
    }
  
    scheduleEvent(name: string, description: string, date: Date, location: string): Event {
      const event = new Event(generateId(), name, description, date, location, this.id);
      this.events.push(event);
      return event;
    }
  
    addXP(amount: number): boolean {
      this.xp += amount;
      // Check for level up
      const newLevel = calculateLevel(this.xp);
      if (newLevel > this.level) {
        this.level = newLevel;
        return true; // Level up occurred
      }
      return false;
    }
  }
  
  // Squad Model
  class Squad {
    id: string;
    name: string;
    battalionId: string;
    leaderId: string;
    members: string[]; // Array of userIds
    objectives: BattalionObjective[];
    chatHistory: ChatMessage[];
  
    constructor(id: string, name: string, battalionId: string, leaderId: string) {
      this.id = id;
      this.name = name;
      this.battalionId = battalionId;
      this.leaderId = leaderId;
      this.members = [leaderId];
      this.objectives = [];
      this.chatHistory = [];
    }
  
    addMember(userId: string): boolean {
      if (!this.members.includes(userId)) {
        this.members.push(userId);
        return true;
      }
      return false;
    }
  
    removeMember(userId: string): void {
      this.members = this.members.filter(id => id !== userId);
      // If leader is removed, assign new leader
      if (userId === this.leaderId && this.members.length > 0) {
        this.leaderId = this.members[0];
      }
    }
  
    addMessage(userId: string, text: string): void {
      this.chatHistory.push({
        userId,
        text,
        timestamp: Date.now()
      });
    }
  
    assignObjective(title: string, description: string, coordinates?: { latitude: number; longitude: number }): void {
      this.objectives.push({
        title,
        description,
        coordinates,
        completed: false,
        assignedAt: Date.now()
      });
    }
  
    completeObjective(index: number): boolean {
      if (this.objectives[index]) {
        this.objectives[index].completed = true;
        this.objectives[index].completedAt = Date.now();
        return true;
      }
      return false;
    }
  }
  
  // Event Model
  class Event {
    id: string;
    name: string;
    description: string;
    date: Date;
    location: string;
    battalionId: string;
    attendees: EventAttendee[];
    objectives: BattalionObjective[];
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  
    constructor(id: string, name: string, description: string, date: Date, location: string, battalionId: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.date = date;
      this.location = location;
      this.battalionId = battalionId;
      this.attendees = [];
      this.objectives = [];
      this.status = "scheduled";
    }
  
    addAttendee(userId: string, status: EventAttendee['status'] = 'confirmed'): void {
      const existing = this.attendees.findIndex(a => a.userId === userId);
      if (existing >= 0) {
        this.attendees[existing].status = status;
      } else {
        this.attendees.push({
          userId,
          status,
          joinedAt: Date.now()
        });
      }
    }
  
    removeAttendee(userId: string): void {
      this.attendees = this.attendees.filter(a => a.userId !== userId);
    }
  
    addObjective(title: string, description: string, coordinates?: { latitude: number; longitude: number }, qrCode?: string): void {
      this.objectives.push({
        title,
        description,
        coordinates,
        qrCode,
        completed: false,
        assignedAt: Date.now()
      });
    }
  
    markObjectiveComplete(index: number): boolean {
      if (this.objectives[index]) {
        this.objectives[index].completed = true;
        this.objectives[index].completedAt = Date.now();
        return true;
      }
      return false;
    }
  
    updateStatus(status: Event['status']): void {
      this.status = status;
    }
  }
  
  // User Extension for Battalion-related data
  class UserBattalionProfile {
    userId: string;
    battalions: string[]; // Array of battalionIds
    primaryBattalionId: string | null;
    rank: BattalionMember['rank'];
    achievements: Achievement[];
    xp: number;
    attendedEvents: { eventId: string; attendedAt: number }[];
  
    constructor(userId: string) {
      this.userId = userId;
      this.battalions = [];
      this.primaryBattalionId = null;
      this.rank = "soldier";
      this.achievements = [];
      this.xp = 0;
      this.attendedEvents = [];
    }
  
    joinBattalion(battalionId: string, rank: BattalionMember['rank'] = "soldier"): void {
      if (!this.battalions.includes(battalionId)) {
        this.battalions.push(battalionId);
        if (!this.primaryBattalionId) {
          this.primaryBattalionId = battalionId;
        }
        this.rank = rank;
      }
    }
  
    leaveBattalion(battalionId: string): void {
      this.battalions = this.battalions.filter(id => id !== battalionId);
      if (this.primaryBattalionId === battalionId) {
        this.primaryBattalionId = this.battalions[0] || null;
      }
    }
  
    setPrimaryBattalion(battalionId: string): boolean {
      if (this.battalions.includes(battalionId)) {
        this.primaryBattalionId = battalionId;
        return true;
      }
      return false;
    }
  
    addAchievement(achievement: Achievement): void {
      this.achievements.push({
        ...achievement,
        earnedAt: Date.now()
      });
    }
  
    attendEvent(eventId: string): void {
      this.attendedEvents.push({
        eventId,
        attendedAt: Date.now()
      });
    }
  
    addXP(amount: number): void {
      this.xp += amount;
    }
  }
  
  // Application Model
  class BattalionApplication {
    userId: string;
    battalionId: string;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: number;
    reviewedAt: number | null;
    reviewedBy: string | null;
  
    constructor(userId: string, battalionId: string, message: string) {
      this.userId = userId;
      this.battalionId = battalionId;
      this.message = message;
      this.status = "pending";
      this.submittedAt = Date.now();
      this.reviewedAt = null;
      this.reviewedBy = null;
    }
  
    approve(reviewerId: string): void {
      this.status = "approved";
      this.reviewedAt = Date.now();
      this.reviewedBy = reviewerId;
    }
  
    reject(reviewerId: string): void {
      this.status = "rejected";
      this.reviewedAt = Date.now();
      this.reviewedBy = reviewerId;
    }
  }
  
  // Utility functions
  function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  function calculateLevel(xp: number): number {
    // Simple level calculation - can be adjusted
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  }
  
  // Controllers - Business logic
  
  interface DataService {
    getBattalion(battalionId: string): Promise<Battalion>;
    saveBattalion(battalion: Battalion): Promise<Battalion>;
    getBattalionsByFilter(filters: Record<string, any>): Promise<Battalion[]>;
    getUserProfile(userId: string): Promise<UserBattalionProfile>;
    saveUserProfile(userProfile: UserBattalionProfile): Promise<UserBattalionProfile>;
    getApplication(applicationId: string): Promise<BattalionApplication>;
    saveApplication(application: BattalionApplication): Promise<BattalionApplication>;
    getEvent(eventId: string): Promise<Event>;
    saveEvent(event: Event): Promise<Event>;
  }
  
  // Battalion Controller
  class BattalionController {
    private dataService: DataService;
  
    constructor(dataService: DataService) {
      this.dataService = dataService;
    }
  
    async createBattalion(
      name: string, 
      emblem: string, 
      privacy: Battalion['privacy'], 
      motto: string, 
      commanderId: string
    ): Promise<Battalion> {
      const id = generateId();
      const battalion = new Battalion(id, name, emblem, privacy, motto, commanderId);
      battalion.addMember(commanderId, "commander");
      
      // Update user profile
      const userProfile = await this.dataService.getUserProfile(commanderId);
      userProfile.joinBattalion(id, "commander");
      userProfile.setPrimaryBattalion(id);
      
      // Save to database
      await this.dataService.saveBattalion(battalion);
      await this.dataService.saveUserProfile(userProfile);
      
      return battalion;
    }
  
    async joinBattalion(userId: string, battalionId: string, rank: BattalionMember['rank'] = "soldier"): Promise<Battalion> {
      const battalion = await this.dataService.getBattalion(battalionId);
      const userProfile = await this.dataService.getUserProfile(userId);
      
      battalion.addMember(userId, rank);
      userProfile.joinBattalion(battalionId, rank);
      
      await this.dataService.saveBattalion(battalion);
      await this.dataService.saveUserProfile(userProfile);
      
      return battalion;
    }
  
    async applyToBattalion(userId: string, battalionId: string, message: string): Promise<BattalionApplication> {
      const application = new BattalionApplication(userId, battalionId, message);
      await this.dataService.saveApplication(application);
      return application;
    }
  
    async reviewApplication(applicationId: string, reviewerId: string, approved: boolean): Promise<BattalionApplication> {
      const application = await this.dataService.getApplication(applicationId);
      const battalion = await this.dataService.getBattalion(application.battalionId);
      
      // Check if reviewer has permission
      const reviewer = battalion.members.find(member => member.userId === reviewerId);
      if (!reviewer || !["commander", "lieutenant"].includes(reviewer.rank)) {
        throw new Error("Insufficient permissions");
      }
      
      if (approved) {
        application.approve(reviewerId);
        await this.joinBattalion(application.userId, application.battalionId);
      } else {
        application.reject(reviewerId);
      }
      
      await this.dataService.saveApplication(application);
      return application;
    }
  
    async getBattalionsByFilter(filters: Record<string, any>): Promise<Battalion[]> {
      // Filters can include: activity, playstyle, location, etc.
      return await this.dataService.getBattalionsByFilter(filters);
    }
  
    async promoteMember(battalionId: string, memberId: string, newRank: BattalionMember['rank'], promoterId: string): Promise<Battalion> {
      const battalion = await this.dataService.getBattalion(battalionId);
      
      // Check if promoter has permission
      const promoter = battalion.members.find(member => member.userId === promoterId);
      if (!promoter) {
        throw new Error("Promoter not found in battalion");
      }
      
      if (promoter.rank !== "commander" && 
          !(promoter.rank === "lieutenant" && newRank === "sergeant")) {
        throw new Error("Insufficient permissions");
      }
      
      battalion.promoteMember(memberId, newRank);
      await this.dataService.saveBattalion(battalion);
      
      // Update user profile
      const userProfile = await this.dataService.getUserProfile(memberId);
      userProfile.rank = newRank;
      await this.dataService.saveUserProfile(userProfile);
      
      return battalion;
    }
  
    async createSquad(battalionId: string, name: string, leaderId: string, creatorId: string): Promise<Squad> {
      const battalion = await this.dataService.getBattalion(battalionId);
      
      // Check if creator has permission
      const creator = battalion.members.find(member => member.userId === creatorId);
      if (!creator || !["commander", "lieutenant"].includes(creator.rank)) {
        throw new Error("Insufficient permissions");
      }
      
      const squad = battalion.createSquad(name, leaderId);
      await this.dataService.saveBattalion(battalion);
      
      return squad;
    }
  
    async scheduleEvent(
      battalionId: string, 
      name: string, 
      description: string, 
      date: Date, 
      location: string, 
      creatorId: string
    ): Promise<Event> {
      const battalion = await this.dataService.getBattalion(battalionId);
      
      // Check if creator has permission
      const creator = battalion.members.find(member => member.userId === creatorId);
      if (!creator || !["commander", "lieutenant", "sergeant"].includes(creator.rank)) {
        throw new Error("Insufficient permissions");
      }
      
      const event = battalion.scheduleEvent(name, description, date, location);
      await this.dataService.saveBattalion(battalion);
      
      return event;
    }
  
    async addAttendeeToEvent(eventId: string, userId: string, status: EventAttendee['status'] = 'confirmed'): Promise<Event> {
      const event = await this.dataService.getEvent(eventId);
      event.addAttendee(userId, status);
      await this.dataService.saveEvent(event);
      
      // Update user profile
      const userProfile = await this.dataService.getUserProfile(userId);
      userProfile.attendEvent(eventId);
      await this.dataService.saveUserProfile(userProfile);
      
      return event;
    }
  
    async completeObjective(eventId: string, objectiveIndex: number, squadId?: string): Promise<Event> {
      const event = await this.dataService.getEvent(eventId);
      const battalion = await this.dataService.getBattalion(event.battalionId);
      
      event.markObjectiveComplete(objectiveIndex);
      await this.dataService.saveEvent(event);
      
      // Award XP to battalion and members
      const XP_PER_OBJECTIVE = 50;
      battalion.addXP(XP_PER_OBJECTIVE);
      await this.dataService.saveBattalion(battalion);
      
      // If squad is specified, award XP to squad members
      if (squadId) {
        const squad = battalion.squads.find(s => s.id === squadId);
        if (squad) {
          for (const memberId of squad.members) {
            const userProfile = await this.dataService.getUserProfile(memberId);
            userProfile.addXP(XP_PER_OBJECTIVE / squad.members.length);
            await this.dataService.saveUserProfile(userProfile);
          }
        }
      }
      
      return event;
    }
  
    async flagInactiveMembers(battalionId: string, days: number = 30): Promise<Array<{userId: string, rank: string, lastActivity: number}>> {
      const battalion = await this.dataService.getBattalion(battalionId);
      const now = Date.now();
      const inactiveThreshold = days * 24 * 60 * 60 * 1000; // Convert days to milliseconds
      
      const inactiveMembers = [];
      for (const member of battalion.members) {
        const userProfile = await this.dataService.getUserProfile(member.userId);
        const lastActivity = this.getLastActivity(userProfile);
        
        if (now - lastActivity > inactiveThreshold) {
          inactiveMembers.push({
            userId: member.userId,
            rank: member.rank,
            lastActivity
          });
        }
      }
      
      return inactiveMembers;
    }
  
    private getLastActivity(userProfile: UserBattalionProfile): number {
      // Find the latest activity timestamp
      const timestamps = [
        userProfile.attendedEvents.length > 0 ? 
          Math.max(...userProfile.attendedEvents.map(e => e.attendedAt)) : 0,
        userProfile.achievements.length > 0 ?
          Math.max(...userProfile.achievements.map(a => a.earnedAt || 0)) : 0
      ];
      
      return Math.max(...timestamps, 0);
    }
  
    async transferCommandership(battalionId: string, oldCommanderId: string, newCommanderId: string): Promise<Battalion> {
      const battalion = await this.dataService.getBattalion(battalionId);
      
      // Verify old commander
      if (battalion.commanderId !== oldCommanderId) {
        throw new Error("Only the current commander can transfer leadership");
      }
      
      // Update battalion
      battalion.commanderId = newCommanderId;
      
      // Update ranks
      battalion.promoteMember(oldCommanderId, "lieutenant");
      battalion.promoteMember(newCommanderId, "commander");
      
      await this.dataService.saveBattalion(battalion);
      
      // Update user profiles
      const oldCommanderProfile = await this.dataService.getUserProfile(oldCommanderId);
      oldCommanderProfile.rank = "lieutenant";
      await this.dataService.saveUserProfile(oldCommanderProfile);
      
      const newCommanderProfile = await this.dataService.getUserProfile(newCommanderId);
      newCommanderProfile.rank = "commander";
      await this.dataService.saveUserProfile(newCommanderProfile);
      
      return battalion;
    }
  
    async disbandBattalion(battalionId: string, commanderId: string): Promise<Battalion> {
      const battalion = await this.dataService.getBattalion(battalionId);
      
      // Verify commander
      if (battalion.commanderId !== commanderId) {
        throw new Error("Only the commander can disband a battalion");
      }
      
      // Archive battalion and notify members
      battalion.status = "disbanded";
      await this.dataService.saveBattalion(battalion);
      
      // Update user profiles
      for (const member of battalion.members) {
        const userProfile = await this.dataService.getUserProfile(member.userId);
        userProfile.leaveBattalion(battalionId);
        await this.dataService.saveUserProfile(userProfile);
        
        // Notify member (implement notification system)
        // this.notificationService.notifyUser(member.userId, "Battalion Disbanded", 
        //   `The battalion "${battalion.name}" has been disbanded by the commander.`);
      }
      
      return battalion;
    }
  }
  
  // Data Service - API Integration
  
  class BattalionDataService implements DataService {
    private apiClient: any; // Type would depend on your API client implementation
  
    constructor(apiClient: any) {
      this.apiClient = apiClient;
    }
  
    async getBattalion(battalionId: string): Promise<Battalion> {
      const response = await this.apiClient.get(`/battalions/${battalionId}`);
      return response.data;
    }
  
    async saveBattalion(battalion: Battalion): Promise<Battalion> {
      const response = await this.apiClient.put(`/battalions/${battalion.id}`, battalion);
      return response.data;
    }
  
    async getBattalionsByFilter(filters: Record<string, any>): Promise<Battalion[]> {
      const response = await this.apiClient.get('/battalions', { params: filters });
      return response.data;
    }
  
    async getUserProfile(userId: string): Promise<UserBattalionProfile> {
      try {
        const response = await this.apiClient.get(`/users/${userId}/battalion-profile`);
        return response.data;
      } catch (error) {
        // If profile doesn't exist yet, create a new one
        const newProfile = new UserBattalionProfile(userId);
        await this.saveUserProfile(newProfile);
        return newProfile;
      }
    }
  
    async saveUserProfile(userProfile: UserBattalionProfile): Promise<UserBattalionProfile> {
      const response = await this.apiClient.put(`/users/${userProfile.userId}/battalion-profile`, userProfile);
      return response.data;
    }
  
    async getApplication(applicationId: string): Promise<BattalionApplication> {
      const response = await this.apiClient.get(`/applications/${applicationId}`);
      return response.data;
    }
  
    async saveApplication(application: BattalionApplication): Promise<BattalionApplication> {
      const response = await this.apiClient.put(
        `/applications/${application.userId}_${application.battalionId}`, 
        application
      );
      return response.data;
    }
  
    async getEvent(eventId: string): Promise<Event> {
      const response = await this.apiClient.get(`/events/${eventId}`);
      return response.data;
    }
  
    async saveEvent(event: Event): Promise<Event> {
      const response = await this.apiClient.put(`/events/${event.id}`, event);
      return response.data;
    }
  }
  
  // System export and initialization
  export function initializeBattalionSystem(apiClient: any) {
    const dataService = new BattalionDataService(apiClient);
    const battalionController = new BattalionController(dataService);
    
    return {
      controllers: {
        battalion: battalionController
      }
    };
  }
  
  // Export all models and classes
  export {
    Battalion,
    Squad,
    Event,
    UserBattalionProfile,
    BattalionApplication,
    BattalionController,
    BattalionDataService
  };