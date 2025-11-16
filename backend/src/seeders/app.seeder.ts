import "dotenv/config";
import mongoose from "mongoose";
import connectDatabase from "../config/database.config";
import UserModel, { UserDocument } from "../models/user.model";
import WorkspaceModel, { WorkspaceDocument } from "../models/workspace.model";
import ProjectModel, { ProjectDocument } from "../models/project.model";
import MemberModel, { MemberDocument } from "../models/member.model";
import TaskModel from "../models/task.model";
import RoleModel, { RoleDocument } from "../models/roles-permission.model";
import AccountModel from "../models/account.model";
import { RolePermissions } from "../utils/role-permission";
import { RoleType } from "../enums/role.enum";
import { ProviderEnum } from "../enums/account-provider.enum";
import { TaskStatusEnum, TaskPriorityEnum } from "../enums/task.enum";

/**
 * App seeder
 * - Creates 2 workspaces
 * - Each workspace has 2 projects
 * - Each project has an owner + 5 members
 * - Each member has 2 unique tasks assigned on that project
 */

// TYPES
interface TaskTemplate {
  title: string;
  description: string;
}

interface MemberSeed {
  name: string;
  email: string;
}

interface ProjectSeed {
  name: string;
  emoji: string;
  owner: MemberSeed;
  members: MemberSeed[];
  tasks: TaskTemplate[];
}

interface WorkspaceSeed {
  workspaceInfo: {
    name: string;
    description: string;
  };
  owner: MemberSeed;
  projects: ProjectSeed[];
}

// Seed data arrays of WorkspaceSeed
const workspaces: WorkspaceSeed[] = [
  {
    workspaceInfo: {
      name: "Orion Marketing",
      description: "Marketing team workspace for Orion Corporation",
    },
    owner: { name: "Ethan Miller", email: "ethan.miller@orion.example.com" },
    projects: [
      {
        name: "Website Redesign",
        emoji: "🎨",
        owner: {
          name: "Alice Johnson",
          email: "alice.johnson@orion.example.com",
        },
        members: [
          { name: "Tom Hale", email: "tom.hale@orion.example.com" },
          { name: "Priya Singh", email: "priya.singh@orion.example.com" },
          { name: "Marco Alvarez", email: "marco.alvarez@orion.example.com" },
          { name: "Yuki Nakamura", email: "yuki.nakamura@orion.example.com" },
          { name: "Sara O'Neil", email: "sara.oneil@orion.example.com" },
        ],
        tasks: [
          {
            title: "Create high-fidelity homepage mockups",
            description:
              "Design polished mockups for the homepage and hero section.",
          },
          {
            title: "Write homepage copy",
            description: "Draft concise, benefit-driven copy for the homepage.",
          },
          {
            title: "Conduct user research interviews",
            description:
              "Interview 5 target users to validate design assumptions.",
          },
          {
            title: "Optimize mobile responsiveness",
            description:
              "Ensure all page elements work perfectly on mobile devices.",
          },
          {
            title: "Implement accessibility features",
            description: "Add ARIA labels and keyboard navigation support.",
          },
          {
            title: "Set up analytics tracking",
            description: "Configure Google Analytics and conversion tracking.",
          },
          {
            title: "Create brand style guide",
            description: "Document colors, fonts, and visual guidelines.",
          },
          {
            title: "Test cross-browser compatibility",
            description:
              "Verify site works correctly across Chrome, Firefox, Safari.",
          },
          {
            title: "Build contact form backend",
            description:
              "Implement server-side form processing and validation.",
          },
          {
            title: "Optimize page load speeds",
            description:
              "Compress images and minimize CSS/JS for faster loading.",
          },
          {
            title: "Create FAQ section",
            description:
              "Design and implement comprehensive FAQ page with search functionality.",
          },
          {
            title: "Set up CDN integration",
            description:
              "Configure content delivery network for global performance.",
          },
          {
            title: "Implement live chat widget",
            description:
              "Add customer support chat functionality to all pages.",
          },
          {
            title: "Create product showcase gallery",
            description:
              "Build interactive gallery to display product features.",
          },
          {
            title: "Add customer testimonials section",
            description:
              "Design and implement testimonials carousel with ratings.",
          },
          {
            title: "Set up A/B testing framework",
            description:
              "Implement testing infrastructure for homepage variations.",
          },
          {
            title: "Create blog section layout",
            description:
              "Design responsive blog layout with category filtering.",
          },
          {
            title: "Implement search functionality",
            description: "Add site-wide search with autocomplete and filters.",
          },
          {
            title: "Set up social media integration",
            description: "Add social sharing buttons and feed integration.",
          },
          {
            title: "Create pricing calculator tool",
            description: "Build interactive pricing calculator for services.",
          },
        ],
      },
      {
        name: "Q4 Email Campaign",
        emoji: "✉️",
        owner: { name: "Brian Lee", email: "brian.lee@orion.example.com" },
        members: [
          { name: "Lina Gomez", email: "lina.gomez@orion.example.com" },
          { name: "Omar Farouk", email: "omar.farouk@orion.example.com" },
          { name: "Hannah Park", email: "hannah.park@orion.example.com" },
          { name: "Daniel Kim", email: "daniel.kim@orion.example.com" },
          { name: "Maya Patel", email: "maya.patel@orion.example.com" },
        ],
        tasks: [
          {
            title: "Draft campaign schedule",
            description:
              "Create a send schedule and segmentation plan for Q4 emails.",
          },
          {
            title: "Write email templates",
            description:
              "Develop subject lines and body templates for promotional emails.",
          },
          {
            title: "Design email graphics",
            description:
              "Create compelling visual assets for email headers and CTAs.",
          },
          {
            title: "Set up email automation flows",
            description: "Configure drip sequences for new subscribers.",
          },
          {
            title: "A/B test subject lines",
            description:
              "Run tests on subject line variations to improve open rates.",
          },
          {
            title: "Segment customer database",
            description: "Create targeted segments based on purchase history.",
          },
          {
            title: "Write newsletter content",
            description:
              "Draft engaging content for monthly newsletter editions.",
          },
          {
            title: "Configure tracking pixels",
            description: "Set up email open and click tracking for analytics.",
          },
          {
            title: "Create unsubscribe flow",
            description:
              "Design smooth unsubscribe experience and preference center.",
          },
          {
            title: "Test email deliverability",
            description:
              "Check spam scores and inbox placement across providers.",
          },
          {
            title: "Create welcome email series",
            description:
              "Design automated welcome sequence for new subscribers.",
          },
          {
            title: "Set up email list segmentation",
            description: "Create dynamic segments based on user behavior.",
          },
          {
            title: "Design mobile email templates",
            description: "Optimize email layouts for mobile devices.",
          },
          {
            title: "Implement email personalization",
            description: "Add dynamic content based on user preferences.",
          },
          {
            title: "Create re-engagement campaign",
            description: "Design campaign to win back inactive subscribers.",
          },
          {
            title: "Set up email performance dashboard",
            description: "Build analytics dashboard for campaign metrics.",
          },
          {
            title: "Test email client compatibility",
            description: "Ensure emails render correctly across email clients.",
          },
          {
            title: "Create holiday campaign templates",
            description: "Design seasonal email templates for holidays.",
          },
          {
            title: "Implement email scheduling system",
            description: "Build system for optimal send time scheduling.",
          },
          {
            title: "Set up email compliance checks",
            description:
              "Ensure all emails meet GDPR and CAN-SPAM requirements.",
          },
        ],
      },
      {
        name: "Tech Startup App Development",
        emoji: "🚀",
        owner: {
          name: "David Wilson",
          email: "david.wilson@orion.example.com",
        },
        members: [
          { name: "Jake Thompson", email: "jake.thompson@orion.example.com" },
          { name: "Emma Davis", email: "emma.davis@orion.example.com" },
          { name: "Ryan Foster", email: "ryan.foster@orion.example.com" },
          { name: "Luna Rodriguez", email: "luna.rodriguez@orion.example.com" },
          { name: "Alex Morgan", email: "alex.morgan@orion.example.com" },
        ],
        tasks: [
          {
            title: "Implement onboarding flow",
            description: "Add new guided onboarding for first-time users.",
          },
          {
            title: "Improve sync reliability",
            description: "Fix intermittent sync failures and add retries.",
          },
          {
            title: "Add dark mode support",
            description: "Implement dark theme option throughout the app.",
          },
          {
            title: "Optimize database queries",
            description: "Reduce query time for user data fetching.",
          },
          {
            title: "Implement push notifications",
            description: "Add real-time notification system for updates.",
          },
          {
            title: "Build offline mode",
            description: "Enable core app functionality without internet.",
          },
          {
            title: "Add biometric authentication",
            description: "Support Face ID and fingerprint login.",
          },
          {
            title: "Create widget extensions",
            description: "Build home screen widgets for quick access.",
          },
          {
            title: "Implement file sharing",
            description: "Allow users to share documents within the app.",
          },
          {
            title: "Add advanced search",
            description: "Build powerful search with filters and sorting.",
          },
        ],
      },
      {
        name: "Marketing Analytics Dashboard",
        emoji: "🎮",
        owner: {
          name: "Rachel Martinez",
          email: "rachel.martinez@orion.example.com",
        },
        members: [
          { name: "Oliver Chen", email: "oliver.chen@orion.example.com" },
          { name: "Sophie Turner", email: "sophie.turner@orion.example.com" },
          { name: "Diego Mendes", email: "diego.mendes@orion.example.com" },
          { name: "Zara Khan", email: "zara.khan@orion.example.com" },
          { name: "Max Schmidt", email: "max.schmidt@orion.example.com" },
        ],
        tasks: [
          {
            title: "Define campaign goals",
            description: "Outline top-level visibility objectives for Q1.",
          },
          {
            title: "Create brand video",
            description: "Produce a 30-second brand awareness video.",
          },
          {
            title: "Launch social ads",
            description: "Run paid ads across Meta and TikTok.",
          },
          {
            title: "Keyword research",
            description: "Identify high-intent keywords for core products.",
          },
          {
            title: "Optimize landing pages",
            description: "Improve headings, metadata and alt tags.",
          },
          {
            title: "Backlink outreach",
            description: "Contact partners for new backlink opportunities.",
          },
          {
            title: "Prepare launch assets",
            description: "Design product banners and feature cards.",
          },
          {
            title: "Coordinate PR outreach",
            description: "Send press kits to selected journalists.",
          },
          {
            title: "Launch landing page",
            description: "Publish optimized landing page for launch.",
          },
        ],
      },
    ],
  },
  {
    workspaceInfo: {
      name: "Pioneer Product",
      description: "Product development workspace for Pioneer Labs",
    },
    owner: { name: "Olivia Brown", email: "olivia.brown@pioneer.example.com" },
    projects: [
      {
        name: "Mobile App v2",
        emoji: "📱",
        owner: {
          name: "Noah Wilson",
          email: "noah.wilson@pioneer.example.com",
        },
        members: [
          { name: "Grace Liu", email: "grace.liu@pioneer.example.com" },
          { name: "Evan Turner", email: "evan.turner@pioneer.example.com" },
          { name: "Carlos Mendes", email: "carlos.mendes@pioneer.example.com" },
          { name: "Aisha Khan", email: "aisha.khan@pioneer.example.com" },
          { name: "Felix Schmidt", email: "felix.schmidt@pioneer.example.com" },
        ],
        tasks: [
          {
            title: "Implement onboarding flow",
            description: "Add new guided onboarding for first-time users.",
          },
          {
            title: "Improve sync reliability",
            description: "Fix intermittent sync failures and add retries.",
          },
          {
            title: "Add dark mode support",
            description: "Implement dark theme option throughout the app.",
          },
          {
            title: "Optimize database queries",
            description: "Reduce query time for user data fetching.",
          },
          {
            title: "Implement push notifications",
            description: "Add real-time notification system for updates.",
          },
          {
            title: "Build offline mode",
            description: "Enable core app functionality without internet.",
          },
          {
            title: "Add biometric authentication",
            description: "Support Face ID and fingerprint login.",
          },
          {
            title: "Create widget extensions",
            description: "Build home screen widgets for quick access.",
          },
          {
            title: "Implement file sharing",
            description: "Allow users to share documents within the app.",
          },
          {
            title: "Add advanced search",
            description: "Build powerful search with filters and sorting.",
          },
          {
            title: "Implement user onboarding tutorial",
            description: "Create interactive tutorial for new users.",
          },
          {
            title: "Add social login integration",
            description:
              "Implement Google, Facebook, and Apple sign-in options.",
          },
          {
            title: "Create app performance monitoring",
            description: "Set up crash reporting and performance tracking.",
          },
          {
            title: "Implement data backup system",
            description: "Create automatic cloud backup for user data.",
          },
          {
            title: "Add multi-language support",
            description: "Implement internationalization for global users.",
          },
          {
            title: "Create app store optimization",
            description: "Optimize app store listings and screenshots.",
          },
          {
            title: "Implement in-app purchases",
            description: "Add premium features with subscription model.",
          },
          {
            title: "Add voice commands feature",
            description: "Implement voice control for hands-free operation.",
          },
          {
            title: "Create user feedback system",
            description: "Build in-app feedback collection and rating system.",
          },
          {
            title: "Implement progressive web app",
            description: "Add PWA capabilities for web version.",
          },
        ],
      },
      {
        name: "Analytics Dashboard",
        emoji: "📊",
        owner: {
          name: "Sophia Martinez",
          email: "sophia.martinez@pioneer.example.com",
        },
        members: [
          { name: "Liam O'Connor", email: "liam.oconnor@pioneer.example.com" },
          { name: "Zoe Chen", email: "zoe.chen@pioneer.example.com" },
          { name: "Marcus Reed", email: "marcus.reed@pioneer.example.com" },
          { name: "Anika Rao", email: "anika.rao@pioneer.example.com" },
          { name: "Peter Novak", email: "peter.novak@pioneer.example.com" },
        ],
        tasks: [
          {
            title: "Define KPIs",
            description: "Agree on primary KPIs to display in the dashboard.",
          },
          {
            title: "Build charts prototype",
            description:
              "Prototype charts for session, retention and conversions.",
          },
          {
            title: "Implement real-time updates",
            description: "Add live data streaming to dashboard charts.",
          },
          {
            title: "Create export functionality",
            description: "Allow users to export reports as PDF/CSV.",
          },
          {
            title: "Add custom date ranges",
            description: "Enable flexible date picker for time-based analysis.",
          },
          {
            title: "Build user segmentation",
            description: "Create cohort analysis and user grouping features.",
          },
          {
            title: "Implement data alerts",
            description: "Set up automated alerts for anomalies in metrics.",
          },
          {
            title: "Add drill-down capabilities",
            description: "Enable users to explore data in deeper detail.",
          },
          {
            title: "Create mobile dashboard",
            description: "Optimize dashboard layout for mobile devices.",
          },
          {
            title: "Set up automated reports",
            description: "Schedule weekly/monthly reports via email.",
          },
          {
            title: "Create data visualization library",
            description: "Build reusable chart components for analytics.",
          },
          {
            title: "Implement real-time collaboration",
            description: "Add collaborative features for dashboard editing.",
          },
          {
            title: "Add data filtering capabilities",
            description: "Create advanced filtering system for datasets.",
          },
          {
            title: "Set up data warehouse integration",
            description: "Connect dashboard to enterprise data warehouse.",
          },
          {
            title: "Create custom widget builder",
            description: "Allow users to create custom dashboard widgets.",
          },
          {
            title: "Implement role-based access control",
            description: "Add permissions system for dashboard access.",
          },
          {
            title: "Add data annotation features",
            description:
              "Allow users to add notes and comments to data points.",
          },
          {
            title: "Create dashboard templates",
            description:
              "Build pre-configured dashboard templates for common use cases.",
          },
          {
            title: "Implement data quality monitoring",
            description:
              "Add system to monitor and alert on data quality issues.",
          },
          {
            title: "Set up cache optimization",
            description:
              "Implement intelligent caching for faster dashboard loading.",
          },
        ],
      },
    ],
  },
];

const seedApp = async () => {
  console.log("App seeding started...");

  let session: mongoose.ClientSession | null = null;

  try {
    await connectDatabase();

    session = await mongoose.startSession();
    session.startTransaction();

    // Clear existing data (keep roles intact unless missing)
    console.log("Clearing existing data...");
    await TaskModel.deleteMany({}, { session });
    await MemberModel.deleteMany({}, { session });
    await ProjectModel.deleteMany({}, { session });
    await WorkspaceModel.deleteMany({}, { session });
    await AccountModel.deleteMany({}, { session });
    await UserModel.deleteMany({}, { session });

    // Ensure roles exist (create if missing)
    const roleDocs: Record<RoleType, RoleDocument> = {} as Record<
      RoleType,
      RoleDocument
    >;
    for (const roleName in RolePermissions) {
      const roleKey = roleName as keyof typeof RolePermissions;
      let roleDoc = await RoleModel.findOne({ name: roleKey })
        .session(session)
        .exec();

      if (!roleDoc) {
        const created = new RoleModel({
          name: roleKey,
          permissions: RolePermissions[roleKey],
        });
        await created.save({ session });
        roleDoc = created;
        console.log(`Created role ${roleKey}`);
      }
      roleDocs[roleKey] = roleDoc;
    }

    // Helper to create a user with account
    const createUser = async (
      name: string,
      email: string,
      password = "password123"
    ): Promise<UserDocument> => {
      const u = new UserModel({ name, email, password });
      await u.save({ session });

      // Create corresponding Account document for EMAIL provider
      const account = new AccountModel({
        userId: u._id,
        provider: ProviderEnum.EMAIL,
        providerId: email,
      });
      await account.save({ session });

      return u as UserDocument;
    };

    // Insert workspaces, projects, members and tasks using the arrays above
    for (const wsSeed of workspaces) {
      // Workspace owner
      const wsOwner = await createUser(wsSeed.owner.name, wsSeed.owner.email);

      const workspace = new WorkspaceModel({
        name: wsSeed.workspaceInfo.name,
        description: wsSeed.workspaceInfo.description,
        owner: wsOwner._id,
      });
      await workspace.save({ session });

      wsOwner.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
      await wsOwner.save({ session });

      // Add workspace owner as a member with OWNER role
      const wsOwnerMember = new MemberModel({
        userId: wsOwner._id,
        workspaceId: workspace._id,
        role: roleDocs["OWNER"]._id,
      });
      await wsOwnerMember.save({ session });

      for (const projSeed of wsSeed.projects) {
        // Project owner
        const projectOwner = await createUser(
          projSeed.owner.name,
          projSeed.owner.email
        );

        const project = new ProjectModel({
          name: projSeed.name,
          description: `${projSeed.name} for ${wsSeed.workspaceInfo.name}`,
          emoji: projSeed.emoji,
          workspace: workspace._id,
          createdBy: projectOwner._id,
        });
        await project.save({ session });

        // Add project owner as workspace member with OWNER role
        const ownerMember = new MemberModel({
          userId: projectOwner._id,
          workspaceId: workspace._id,
          role: roleDocs["OWNER"]._id, // Use the ObjectId from the role document
        });
        await ownerMember.save({ session });

        // Create members and assign unique tasks to each
        const taskPool = [...projSeed.tasks]; // Copy task pool
        let taskIndex = 0;

        // Define arrays for random assignment of status and priority
        const statusOptions = [
          TaskStatusEnum.BACKLOG,
          TaskStatusEnum.TODO,
          TaskStatusEnum.IN_PROGRESS,
          TaskStatusEnum.IN_REVIEW,
          TaskStatusEnum.DONE,
        ];
        const priorityOptions = [
          TaskPriorityEnum.LOW,
          TaskPriorityEnum.MEDIUM,
          TaskPriorityEnum.HIGH,
        ];

        for (const memberSeed of projSeed.members) {
          const memUser = await createUser(memberSeed.name, memberSeed.email);

          const memberDoc = new MemberModel({
            userId: memUser._id,
            workspaceId: workspace._id,
            role: roleDocs["MEMBER"]._id, // Use the ObjectId from the role document
          });
          await memberDoc.save({ session });

          // Assign 2 unique tasks to this member
          for (let t = 0; t < 2; t++) {
            if (taskIndex >= taskPool.length) {
              taskIndex = 0; // Reset if we run out of tasks
            }

            const taskTemplate = taskPool[taskIndex];

            // Randomly assign status and priority for variation
            let randomStatus =
              statusOptions[Math.floor(Math.random() * statusOptions.length)];
            const randomPriority =
              priorityOptions[
                Math.floor(Math.random() * priorityOptions.length)
              ];

            // Set due date for some tasks (about 70% of tasks)
            const shouldHaveDueDate = Math.random() < 0.7;
            let dueDate = null;
            const isOverdue = Math.random() < 0.25; // 25% chance of being overdue

            if (shouldHaveDueDate) {
              if (isOverdue) {
                // Create overdue tasks (1-14 days past due)
                const daysPastDue = Math.floor(Math.random() * 14) + 1;
                dueDate = new Date();
                dueDate.setDate(dueDate.getDate() - daysPastDue);

                // Overdue tasks should not be DONE - adjust status if needed
                const overdueStatuses = [
                  TaskStatusEnum.BACKLOG,
                  TaskStatusEnum.TODO,
                  TaskStatusEnum.IN_PROGRESS,
                  TaskStatusEnum.IN_REVIEW,
                ];
                randomStatus =
                  overdueStatuses[
                    Math.floor(Math.random() * overdueStatuses.length)
                  ];
              } else {
                // Create future due dates between 1-30 days from now
                const daysFromNow = Math.floor(Math.random() * 30) + 1;
                dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + daysFromNow);
              }
            }

            const task = new TaskModel({
              title: `${taskTemplate.title} (${memUser.name})`,
              description: taskTemplate.description,
              project: project._id,
              workspace: workspace._id,
              status: randomStatus,
              priority: randomPriority,
              assignedTo: memUser._id,
              createdBy: projectOwner._id,
              dueDate: dueDate,
            });
            await task.save({ session });
            taskIndex++;
          }
        }
      }
    }

    await session.commitTransaction();
    session.endSession();
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during app seeding:", error);
    if (session) {
      try {
        if (session.inTransaction()) {
          await session.abortTransaction();
        }
        session.endSession();
      } catch (e) {
        console.error("Error cleaning up session:", e);
      }
    }
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.disconnect();
      console.log("Database connection closed.");
    } catch (e) {
      // ignore
    }
  }
};

seedApp()
  .then(() => {
    console.log("👍App seed script finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌Unhandled error running app seed:", error);
    process.exit(1);
  });
