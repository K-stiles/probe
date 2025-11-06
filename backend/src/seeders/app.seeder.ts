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

/**
 * App seeder
 * - Creates 2 workspaces
 * - Each workspace has 2 projects
 * - Each project has an owner + 5 members
 * - Each member has 2 unique tasks assigned on that project
 */

// Define proper types for our seed data
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


    // Seed data arrays: realistic human names, project names and task templates
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
            owner: { name: "Alice Johnson", email: "alice.johnson@orion.example.com" },
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
                description: "Design polished mockups for the homepage and hero section.",
              },
              {
                title: "Write homepage copy",
                description: "Draft concise, benefit-driven copy for the homepage.",
              },
              {
                title: "Conduct user research interviews",
                description: "Interview 5 target users to validate design assumptions.",
              },
              {
                title: "Optimize mobile responsiveness",
                description: "Ensure all page elements work perfectly on mobile devices.",
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
                description: "Verify site works correctly across Chrome, Firefox, Safari.",
              },
              {
                title: "Build contact form backend",
                description: "Implement server-side form processing and validation.",
              },
              {
                title: "Optimize page load speeds",
                description: "Compress images and minimize CSS/JS for faster loading.",
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
                description: "Create a send schedule and segmentation plan for Q4 emails.",
              },
              {
                title: "Write email templates",
                description: "Develop subject lines and body templates for promotional emails.",
              },
              {
                title: "Design email graphics",
                description: "Create compelling visual assets for email headers and CTAs.",
              },
              {
                title: "Set up email automation flows",
                description: "Configure drip sequences for new subscribers.",
              },
              {
                title: "A/B test subject lines",
                description: "Run tests on subject line variations to improve open rates.",
              },
              {
                title: "Segment customer database",
                description: "Create targeted segments based on purchase history.",
              },
              {
                title: "Write newsletter content",
                description: "Draft engaging content for monthly newsletter editions.",
              },
              {
                title: "Configure tracking pixels",
                description: "Set up email open and click tracking for analytics.",
              },
              {
                title: "Create unsubscribe flow",
                description: "Design smooth unsubscribe experience and preference center.",
              },
              {
                title: "Test email deliverability",
                description: "Check spam scores and inbox placement across providers.",
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
            owner: { name: "Noah Wilson", email: "noah.wilson@pioneer.example.com" },
            members: [
              { name: "Grace Liu", email: "grace.liu@pioneer.example.com" },
              { name: "Evan Turner", email: "evan.turner@pioneer.example.com" },
              { name: "Carlos Mendes", email: "carlos.mendes@pioneer.example.com" },
              { name: "Aisha Khan", email: "aisha.khan@pioneer.example.com" },
              { name: "Felix Schmidt", email: "felix.schmidt@pioneer.example.com" },
            ],
            tasks: [
              { title: "Implement onboarding flow", description: "Add new guided onboarding for first-time users." },
              { title: "Improve sync reliability", description: "Fix intermittent sync failures and add retries." },
              { title: "Add dark mode support", description: "Implement dark theme option throughout the app." },
              { title: "Optimize database queries", description: "Reduce query time for user data fetching." },
              { title: "Implement push notifications", description: "Add real-time notification system for updates." },
              { title: "Build offline mode", description: "Enable core app functionality without internet." },
              { title: "Add biometric authentication", description: "Support Face ID and fingerprint login." },
              { title: "Create widget extensions", description: "Build home screen widgets for quick access." },
              { title: "Implement file sharing", description: "Allow users to share documents within the app." },
              { title: "Add advanced search", description: "Build powerful search with filters and sorting." },
            ],
          },
          {
            name: "Analytics Dashboard",
            emoji: "📊",
            owner: { name: "Sophia Martinez", email: "sophia.martinez@pioneer.example.com" },
            members: [
              { name: "Liam O'Connor", email: "liam.oconnor@pioneer.example.com" },
              { name: "Zoe Chen", email: "zoe.chen@pioneer.example.com" },
              { name: "Marcus Reed", email: "marcus.reed@pioneer.example.com" },
              { name: "Anika Rao", email: "anika.rao@pioneer.example.com" },
              { name: "Peter Novak", email: "peter.novak@pioneer.example.com" },
            ],
            tasks: [
              { title: "Define KPIs", description: "Agree on primary KPIs to display in the dashboard." },
              { title: "Build charts prototype", description: "Prototype charts for session, retention and conversions." },
              { title: "Implement real-time updates", description: "Add live data streaming to dashboard charts." },
              { title: "Create export functionality", description: "Allow users to export reports as PDF/CSV." },
              { title: "Add custom date ranges", description: "Enable flexible date picker for time-based analysis." },
              { title: "Build user segmentation", description: "Create cohort analysis and user grouping features." },
              { title: "Implement data alerts", description: "Set up automated alerts for anomalies in metrics." },
              { title: "Add drill-down capabilities", description: "Enable users to explore data in deeper detail." },
              { title: "Create mobile dashboard", description: "Optimize dashboard layout for mobile devices." },
              { title: "Set up automated reports", description: "Schedule weekly/monthly reports via email." },
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
    const roleDocs: Record<RoleType, RoleDocument> = {} as Record<RoleType, RoleDocument>;
    for (const roleName in RolePermissions) {
      const roleKey = roleName as keyof typeof RolePermissions;
      let roleDoc = await RoleModel.findOne({ name: roleKey }).session(session).exec();

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

      for (const projSeed of wsSeed.projects) {
        // Project owner
        const projectOwner = await createUser(projSeed.owner.name, projSeed.owner.email);

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
            const task = new TaskModel({
              title: `${taskTemplate.title} (${memUser.name})`,
              description: taskTemplate.description,
              project: project._id,
              workspace: workspace._id,
              assignedTo: memUser._id,
              createdBy: projectOwner._id,
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
    console.log("App seed script finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Unhandled error running app seed:", error);
    process.exit(1);
  });
