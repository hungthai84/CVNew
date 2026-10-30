# SWOT Page Implementation Plan

## 1. Overview
Update the Skills page to reflect the personal SWOT analysis provided in the user's image. This involves replacing the current skills page content and updating the data management to use Firebase for all SWOT data (Skills, Stats, Language).

## 2. Data Structure (Firebase/`src/data/skillsData.ts`)
- `strengths`: Array of {label, percent, icon}
- `opportunities`: Array of {title, description, icon}
- `weaknesses`: Array of {label, percent, icon}
- `threats`: Array of {title, description, icon}
- `stats`: {totalSkillsPercent, yearsExperience, teamSize, award}
- `languages`: Array of {label, percent, icon}

## 3. UI Implementation (`src/components/views/SkillsView.tsx`)
- Implement a 4-quadrant grid layout (Strengths, Weaknesses, Opportunities, Threats) mimicking the provided image.
- Create a visual representation for the stats section.
- Create a clear, readable Language Proficiency section.
- Ensure responsive design, adapting from a single-column layout on mobile to a two-column or four-quadrant grid on desktop.
- Use Tailwind CSS to replicate the "glassmorphism" card styles shown in the image.

## 4. Firebase Integration
- Update `src/lib/firebase.ts` if needed (seems correct).
- Implement data fetching in `SkillsView` to pull all SWOT data from Firestore `swot` collection.
- Ensure rules are set to allow read access for the application.

## 5. Timeline
- Day 1: Define Firestore data structure and update `data/skillsData.ts`.
- Day 2: Implement UI components (`SwotCard`, `LanguageCard`, `StatsSection`).
- Day 3: Firebase integration and testing.
