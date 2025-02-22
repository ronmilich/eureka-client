/////////////////////////////
// Union Types / Enumerations
/////////////////////////////

import { Tag } from './tag-models';

/** Difficulty level for executing an idea */
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Very Hard';

/** Gender options for customer segments */
export type Gender = 'male' | 'female' | 'both';

/** Release phases for idea features */
export type ReleasePhase = 'MVP' | 'V1' | 'V2' | 'V3' | 'other';

/** Frequency of payment for expenses or strategies */
export type PaymentFrequency = 'oneTime' | 'monthly' | 'yearly' | 'unknown';

/**
 * Types of monetization strategies.
 * These options cover a variety of revenue models, from recurring subscriptions to one-time transactions.
 */
export type MonetizationStrategyType =
  | 'subscription' // Recurring payments for continued access.
  | 'ads' // Revenue through advertising.
  | 'donations' // Voluntary contributions.
  | 'commissions' // Earning a fee per transaction.
  | 'freemium' // Basic service free with premium paid features.
  | 'pay-per-use' // Charges based on usage.
  | 'licensing' // Revenue from licensing intellectual property.
  | 'affiliate' // Earnings through referral commissions.
  | 'sponsorship' // Income via sponsorship deals.
  | 'crowdfunding' // Funds raised from a large number of small contributions.
  | 'microtransactions' // Small, in-app purchases.
  | 'transaction-fee' // Fees applied to each transaction.
  | 'rental' // Leasing of products or services.
  | 'other'; // Any other model not listed above.

/**
 * Types of service offerings.
 * This set includes digital, physical, and hybrid service categories to cover most business models.
 */
export type ServiceType =
  | 'Mobile App' // Applications designed for mobile devices.
  | 'Web App' // Applications accessed via web browsers.
  | 'Desktop App' // Applications installed on desktop computers.
  | 'SaaS' // Software as a Service model.
  | 'API' // An interface for programmatic access.
  | 'Platform' // A system that connects users, services, or products.
  | 'Physical Product' // Tangible products.
  | 'Hardware' // Electronic or mechanical devices.
  | 'Iot Device' // Internet-connected hardware.
  | 'Subscription Box' // Curated physical products delivered periodically.
  | 'Service' // General service offerings not covered by the above.
  | 'Consulting' // Advisory or expert consulting services.
  | 'Other'; // Any other type not specified above.

/** Impact level for risks, constraints, or challenges */
export type Impact = 'low' | 'medium' | 'high';

export type IdeaStatus =
  | 'Draft'
  | 'Validated'
  | 'In Development'
  | 'Launched'
  | 'Approved'
  | 'Rejected';

/////////////////////////////
// Core Idea and Related Interfaces
/////////////////////////////

/**
 * Core Idea object with additional context and better organization.
 */
export interface IdeaModel {
  /** Unique identifier for the idea */
  id: string;
  /** Metadata for audit and tracking */
  metadata: IdeaMetadata;
  /** Core details including description and value proposition */
  details: IdeaDetails;
  /** Feasibility analysis such as difficulty and investment estimates */
  feasibility: Feasibility;
  /** Timeline and milestones for idea execution */
  roadmap: Roadmap;
  /** Revenue generation strategies */
  monetizationStrategies: MonetizationStrategy[];
  /** Overall financial estimates and expense details */
  financials: Financials;
  /** Market analysis information */
  marketAnalysis: MarketAnalysis;
  /** Competitor and market positioning analysis */
  competitiveAnalysis: CompetitiveAnalysis;
  /** Target customer profiles */
  targetAudience: CustomerProfile[];
  /** Aggregated profile of constraints, challenges, and risks */
  riskProfile: RiskProfile;
  /** List of potential features with execution priorities and phases */
  features: IdeaFeature[];
}

/**
 * General metadata for tracking and audit.
 */
export interface IdeaMetadata {
  /** Computed quality or viability score */
  score: number;
  /** Current status of the idea */
  status: IdeaStatus;
  /** Array of tag references for categorization */
  tags: Tag[];
  /** Date the idea was created */
  createdAt: Date;
  /** Date the idea was last updated */
  updatedAt: Date;
  /** ID of the idea creator */
  authorId: string;
}

/**
 * Core details of the idea.
 */
export interface IdeaDetails {
  /** Title of the idea */
  title: string;
  /** Type of service or product offered */
  serviceType: ServiceType;
  /** Brief overview of the idea */
  shortDescription: string;
  /** Detailed explanation of the idea */
  detailedDescription: string;
  /** Time frame during which the idea remains relevant */
  relevanceTimeFrame: TimeFrame;
  /** Statement of the problem that the idea solves */
  problemStatement: string;
  /** Key benefits and unique value proposition */
  valueProposition: string;
  /** Explanation of what makes the idea unique */
  uniqueDifferentiation: string;
  /** What benefits the idea provides to users Saving money, Saving time, Automate Make people feel socially accepted, Aggregate services together, Making money for people, Connect people, Addictive, Make something more accessible, and so on*/
  benefits: string[];
}

/**
 * Analysis of the idea's execution challenges.
 */
export interface Feasibility {
  /** Difficulty level for executing the idea */
  difficulty: Difficulty;
  /** Estimated development time in days */
  estimatedDevelopmentTime: number;
  /** Estimated investment required (in chosen currency) */
  estimatedInvestment: number;
  /** Optional expected return on investment (percentage or value) */
  expectedROI?: number;
}

/**
 * Structured timeline for idea execution.
 */
export interface Roadmap {
  /** List of milestones within the roadmap */
  milestones: Milestone[];
  /** Optional target launch date */
  targetLaunchDate?: Date;
}

/**
 * Represents a milestone within the roadmap.
 */
export interface Milestone {
  /** Name of the milestone */
  name: string;
  /** Optional description of the milestone */
  description?: string;
  /** Due date for the milestone */
  dueDate: Date;
  /** Flag indicating if the milestone is completed */
  completed: boolean;
}

/**
 * Various strategies to generate revenue from the idea.
 */
export interface MonetizationStrategy {
  /** Type of monetization strategy */
  type: MonetizationStrategyType;
  /** Description of the strategy */
  description: string;
  /** Price associated with the strategy */
  price: number;
  /** Payment frequency (e.g., monthly, yearly) */
  paymentFrequency: PaymentFrequency;
  /** Optional expected monthly revenue */
  expectedMonthlyRevenue?: number;
}

/**
 * Overall financial estimates and expense breakdown.
 */
export interface Financials {
  /** List of individual expense items */
  expenses: Expense[];
  /** Currency used for all financial figures */
  currency: string;
}

/**
 * Represents an individual expense item.
 */
export interface Expense {
  /** Name or description of the expense */
  name: string;
  /** Expense amount */
  amount: number;
  /** Optional currency if different from the global currency */
  currency?: string;
  /** Frequency of the expense */
  frequency: PaymentFrequency;
  /** Optional category (e.g., operational, marketing) */
  category?: string;
  /** Optional provider or source of the expense */
  provider?: string;
  /** Additional details about the expense */
  details?: string;
}

/**
 * Detailed view of the market.
 */
export interface MarketAnalysis {
  /** Primary market sector */
  sector: string;
  /** Sub-sector within the market */
  subSector: string;
  /** Overall size of the market */
  marketSize: number;
  /** Growth rate of the market */
  growthRate: number;
  /** Optional geographic focus (global, regional, local) */
  geographicFocus?: string;
  /** Optional key market trends */
  trends?: string[];
  /** Optional list of market challenges or barriers */
  challenges?: string[];
}

/**
 * Detailed information about a target customer segment.
 */
export interface CustomerProfile {
  /** Name or label for the customer segment */
  segmentName: string;
  /** Age range for the segment */
  ageRange: string;
  /** Gender for the customer segment */
  gender: Gender;
  /** Optional interests or hobbies of the segment */
  interests?: string[];
  /** Optional geographic location of the segment */
  geographicLocation?: string;
}

/**
 * Analysis of competitors and their offerings.
 */
export interface CompetitiveAnalysis {
  /** List of competitor entries */
  competitors: Competitor[];
  /** Features common across competitors */
  commonFeatures: string[];
  /** Gaps in competitor features that the idea might exploit */
  featureGaps: string[];
}

/**
 * Represents a competitor entity.
 */
export interface Competitor {
  /** Competitor's name */
  name: string;
  /** Optional competitor website URL */
  website?: string;
  /** Service type provided by the competitor */
  serviceType: ServiceType;
  /** Optional list of customer feedback entries */
  customerFeedback?: CustomerFeedback[];
  /** List of competitor strengths */
  strengths: string[];
  /** List of competitor weaknesses */
  weaknesses: string[];
  /** List of features offered by the competitor */
  features: string[];
  /** Optional market share value */
  marketShare?: number;
  /** Optional pricing strategy descriptor */
  pricingStrategy?: string;
}

/**
 * Represents customer feedback details.
 */
export interface CustomerFeedback {
  /** Name or identifier of the reviewer */
  reviewer: string;
  /** Content of the review */
  review: string;
  /** Optional rating provided */
  rating?: number;
  /** Optional date of the review */
  date?: Date;
}

/**
 * Represents a time frame for period-related fields.
 */
export interface TimeFrame {
  /** Numeric value of the time period */
  value: number;
  /** Unit of time (days, months, or years) */
  unit: 'days' | 'months' | 'years';
}

/**
 * Represents a potential feature for the idea.
 */
export interface IdeaFeature {
  /** Name of the feature */
  title: string;
  /** Detailed explanation of the feature */
  description: string;
  /** Priority ranking (lower number means higher priority) */
  priority: number;
  /** Planned release phase (e.g., MVP, V1, etc.) */
  phase: ReleasePhase;
  /** Optional list of dependent feature IDs or names */
  dependencies?: string[];
  /** Optional estimated effort (in days, hours, etc.) */
  estimatedEffort?: number;
  /** Optional impact score for engagement/revenue */
  impactScore?: number;
  /** Optional technical complexity level */
  technicalComplexity?: 'low' | 'medium' | 'high';
  /** Optional planned release date */
  plannedReleaseDate?: Date;
  /** Optional current development status */
  status?: 'planned' | 'in-development' | 'completed';
  /** Additional comments or notes */
  notes?: string;
}

/**
 * Basic risk assessment for the idea.
 */
export interface Risk {
  /** Description of the risk */
  description: string;
  /** Likelihood of the risk occurring */
  likelihood: 'low' | 'medium' | 'high';
  /** Impact level of the risk */
  impact: Impact;
  /** Optional mitigation plan to reduce the risk */
  mitigationPlan?: string;
}

/**
 * Represents a constraint affecting the idea.
 */
export interface Constraint {
  /** Description of the constraint */
  description: string;
  /** Type of constraint (technical, market, etc.) */
  type: 'technical' | 'market' | 'financial' | 'regulatory' | 'resource' | 'other';
  /** Impact level of the constraint */
  impact: Impact;
}

/**
 * Represents a challenge to be addressed.
 */
export interface Challenge {
  /** Description of the challenge */
  description: string;
  /** Impact level of the challenge */
  impact: Impact;
  /** Optional mitigation strategies for the challenge */
  mitigationStrategies?: string[];
}

/**
 * Aggregated risk profile including constraints, challenges, and risks.
 */
export interface RiskProfile {
  /** List of constraints affecting the idea */
  constraints: Constraint[];
  /** List of challenges to be addressed */
  challenges: Challenge[];
  /** List of risks associated with the idea */
  risks: Risk[];
}

// slim version of the idea model
export interface SlimIdea {
  id: string;
  details: {
    title: string;
    shortDescription: string;
    serviceType: ServiceType;
  };
  metadata: {
    score: number;
    status: string;
    tags: Tag[];
    createdAt: string;
    updatedAt: string;
  };
  feasibility?: {
    difficulty: Difficulty;
    estimatedDevelopmentTime: number;
  };
  roadmap?: {
    targetLaunchDate?: Date;
    milestones: number;
  };
  monetizationStrategies: number;
  financials?: {
    monthly: number;
    yearly: number;
    oneTime: number;
    unknown: number;
    currency: string;
  };
  marketAnalysis?: {
    sector: string;
    subSector?: string;
    marketSize?: number;
  };
  competitiveAnalysis?: {
    competitors: number;
  };
  targetAudience: number;
  riskProfile?: {
    constraints: number;
    challenges: number;
    risks: number;
  };
  features?: number;
}
