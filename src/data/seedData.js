export const seedData = {
  universities: [
    { id: 'mst', name: 'Missouri S&T', system: 'MyU / SIS' },
    { id: 'nvu', name: 'North Valley University', system: 'JOESS / SIS' }
  ],
  integrations: [
    { system: 'Student Information System', status: 'Connected', lastSynchronized: '2 min ago' },
    { system: 'Degree Audit', status: 'Connected', lastSynchronized: '5 min ago' },
    { system: 'Course Catalog', status: 'Connected', lastSynchronized: '1 min ago' },
    { system: 'Registrar', status: 'Connected', lastSynchronized: '4 min ago' },
    { system: 'Learning Management System', status: 'Connected', lastSynchronized: '7 min ago' },
    { system: 'Financial Aid', status: 'Connected', lastSynchronized: '8 min ago' },
    { system: 'Graduate Education', status: 'Connected', lastSynchronized: '3 min ago' }
  ],
  colleges: [
    { name: 'College of Computing and Engineering', university: 'Missouri S&T' },
    { name: 'College of Arts and Sciences', university: 'Missouri S&T' },
    { name: 'Graduate College of Applied Systems', university: 'North Valley University' }
  ],
  departments: [
    { name: 'Computer Science', college: 'College of Computing and Engineering' },
    { name: 'Data Science and Analytics', college: 'Graduate College of Applied Systems' },
    { name: 'Environmental Engineering', college: 'College of Arts and Sciences' }
  ],
  programs: [
    { name: 'PhD in Computer Science', level: 'Doctoral', credits: 72, seminarCredits: 3, researchCredits: 36, maxSemesterCredits: 10 },
    { name: 'PhD in Environmental Engineering', level: 'Doctoral', credits: 42, seminarCredits: 2, researchCredits: 24, maxSemesterCredits: 9 },
    { name: 'MS in Data Science', level: 'Masters', credits: 30, researchCredits: 6, seminarCredits: 1 }
  ],
  students: [
    {
      id: 'alex',
      username: 'alex.morgan',
      firstName: 'Alex',
      fullName: 'Alex Morgan',
      studentId: 'S10427',
      email: 'alex.morgan@mst.edu',
      internationalStatus: 'Domestic',
      university: 'Missouri S&T',
      college: 'College of Computing and Engineering',
      department: 'Computer Science',
      program: 'PhD Computer Science',
      degreeLevel: 'PhD',
      programStart: 'Fall 2025',
      currentSemester: 'Fall 2026',
      expectedGraduation: 'Spring 2029',
      advisor: 'Dr. Maya Patel',
      coAdvisor: 'Dr. Daniel Chen',
      committeeMembers: ['Dr. Sarah Wilson', 'Dr. Omar Reed'],
      programSemester: 4,
      creditsCompleted: 30,
      creditsRemaining: 42,
      cgpa: '3.72',
      assistantship: 'GRA',
      researchInterests: 'Machine learning for scientific computing',
      careerGoal: 'Research scientist',
      profileSummary: 'PhD student in the fourth semester without a previous masters degree.',
      recommendationCodes: ['CS 5500', 'CS 5001', 'CS 6010'],
      milestoneFocus: 'Qualifying Examination'
    },
    {
      id: 'maya',
      username: 'maya.chen',
      firstName: 'Maya',
      fullName: 'Maya Chen',
      studentId: 'N22108',
      email: 'maya.chen@nvu.edu',
      internationalStatus: 'F-1',
      university: 'North Valley University',
      college: 'Graduate College of Applied Systems',
      department: 'Data Science and Analytics',
      program: 'MS Data Science',
      degreeLevel: 'Masters',
      programStart: 'Spring 2026',
      currentSemester: 'Fall 2026',
      expectedGraduation: 'Spring 2028',
      advisor: 'Dr. Priya Nair',
      coAdvisor: 'Dr. Marcus Hill',
      committeeMembers: ['Dr. Lauren Brooks'],
      programSemester: 2,
      creditsCompleted: 12,
      creditsRemaining: 18,
      cgpa: '3.64',
      assistantship: 'None',
      researchInterests: 'Responsible analytics for public services',
      careerGoal: 'Data analyst in civic technology',
      profileSummary: 'Masters student in the second semester building toward a research capstone.',
      recommendationCodes: ['DS 5300', 'DS 5410', 'DS 5990'],
      milestoneFocus: 'Capstone Proposal'
    },
    {
      id: 'samir',
      username: 'samir.rahman',
      firstName: 'Samir',
      fullName: 'Samir Rahman',
      studentId: 'S30981',
      email: 'samir.rahman@mst.edu',
      internationalStatus: 'J-1',
      university: 'Missouri S&T',
      college: 'College of Arts and Sciences',
      department: 'Environmental Engineering',
      program: 'PhD Environmental Engineering',
      degreeLevel: 'PhD',
      programStart: 'Fall 2026',
      currentSemester: 'Fall 2026',
      expectedGraduation: 'Spring 2029',
      advisor: 'Dr. Elena Brooks',
      coAdvisor: 'Dr. Victor Ames',
      committeeMembers: ['Dr. Hannah Ortiz', 'Dr. Kenji Watanabe'],
      programSemester: 1,
      creditsCompleted: 30,
      creditsRemaining: 42,
      creditsReducedByMasters: 30,
      cgpa: '3.88',
      assistantship: 'GTA',
      researchInterests: 'Water treatment and sensor-driven monitoring',
      careerGoal: 'Environmental research and policy',
      profileSummary: 'International first-semester PhD student with a completed masters degree and reduced remaining coursework.',
      recommendationCodes: ['ENV 6200', 'ENV 6310', 'ENV 6900'],
      milestoneFocus: 'Reduced Coursework Plan'
    }
  ],
  faculty: [
    { name: 'Dr. Maya Patel', department: 'Computer Science', specialization: 'Machine Learning', courses: ['CS 5500'], load: 'Moderate', availability: 'Available', status: 'Active', conflict: 'None' },
    { name: 'Dr. Daniel Chen', department: 'Computer Science', specialization: 'Computer Vision', courses: ['CS 5600'], load: 'Low', availability: 'Available', status: 'Active', conflict: 'None' },
    { name: 'Dr. Sarah Wilson', department: 'Computer Science', specialization: 'Graduate Research Methods', courses: ['CS 5001'], load: 'Moderate', availability: 'Available', status: 'Active', conflict: 'Committee member' },
    { name: 'Dr. Omar Reed', department: 'Computer Science', specialization: 'Natural Language Processing', courses: ['CS 5700'], load: 'Moderate', availability: 'Available', status: 'Active', conflict: 'Committee member' },
    { name: 'Dr. Priya Nair', department: 'Data Science and Analytics', specialization: 'Applied Analytics', courses: ['DS 5300'], load: 'Moderate', availability: 'Available', status: 'Active', conflict: 'None' },
    { name: 'Dr. Elena Brooks', department: 'Environmental Engineering', specialization: 'Water Treatment Systems', courses: ['ENV 6200'], load: 'Low', availability: 'Available', status: 'Active', conflict: 'Advisor' }
  ],
  courses: [
    { code: 'CS 5500', title: 'Advanced Machine Learning', department: 'Computer Science', credits: 3, description: 'Advanced topics in representation learning, model evaluation, and responsible deployment.', prerequisites: 'CS 5200', instructor: 'Dr. Maya Patel', requirement: 'Advanced Computing Elective', assessmentMethod: 'Written Examination / Project', examFormat: 'Closed Book', grading: 'Midterm 25%, Final 35%, Assignments 20%, Project 20%', workload: 'Medium', researchRelevance: 'High', careerRelevance: 'High', fit: 'Strong recommendation', quality: 92, studentReviews: 91, peerTeachingAssessment: 94, departmentalAppraisal: 92, enrollment: 26, curriculumStatus: 'Reviewed Spring 2026', graduationImpact: 'Excellent' },
    { code: 'CS 5001', title: 'Research Methods', department: 'Computer Science', credits: 3, description: 'Research design, literature review, reproducibility, and scholarly communication.', prerequisites: 'Graduate standing', instructor: 'Dr. Sarah Wilson', requirement: 'Research Preparation', assessmentMethod: 'Project / Written', examFormat: 'Open Book', grading: 'Paper 40%, Presentation 20%, Assignments 40%', workload: 'Low', researchRelevance: 'High', careerRelevance: 'Medium', fit: 'Good alternative', quality: 86, studentReviews: 84, peerTeachingAssessment: 88, departmentalAppraisal: 87, enrollment: 22, curriculumStatus: 'Reviewed Spring 2026', graduationImpact: 'Excellent' },
    { code: 'CS 5600', title: 'Computer Vision', department: 'Computer Science', credits: 3, description: 'Image formation, recognition, segmentation, deep vision models, and responsible evaluation.', prerequisites: 'CS 5200 recommended', instructor: 'Dr. Daniel Chen', requirement: 'Advanced Computing Elective', assessmentMethod: 'Project / Presentation', examFormat: 'No final exam', grading: 'Assignments 35%, Project 45%, Presentation 20%', workload: 'Medium', researchRelevance: 'High', careerRelevance: 'High', fit: 'Good alternative', quality: 86, studentReviews: 87, peerTeachingAssessment: 84, departmentalAppraisal: 88, enrollment: 21, curriculumStatus: 'Reviewed Spring 2026', graduationImpact: 'Excellent' },
    { code: 'CS 5700', title: 'Natural Language Processing', department: 'Computer Science', credits: 3, description: 'Language modeling, information extraction, evaluation, and applied NLP systems.', prerequisites: 'CS 5200 recommended', instructor: 'Dr. Omar Reed', requirement: 'Advanced Computing Elective', assessmentMethod: 'Mixed', examFormat: 'Open Book', grading: 'Assignments 30%, Quiz 20%, Project 50%', workload: 'Medium', researchRelevance: 'Medium', careerRelevance: 'High', fit: 'Viable alternative', quality: 78, studentReviews: 79, peerTeachingAssessment: 76, departmentalAppraisal: 80, enrollment: 24, curriculumStatus: 'Reviewed Fall 2025', graduationImpact: 'Good' },
    { code: 'CS 6010', title: 'Graduate Research Seminar', department: 'Computer Science', credits: 1, description: 'Research communication, ethics, and current departmental scholarship.', prerequisites: 'Graduate standing', instructor: 'Dr. Maya Patel', requirement: 'Seminar Credits', assessmentMethod: 'Participation', examFormat: 'No exam', grading: 'Participation 60%, Reflection 40%', workload: 'Low', researchRelevance: 'Medium', careerRelevance: 'Medium', fit: 'Good alternative', quality: 89, studentReviews: 90, peerTeachingAssessment: 88, departmentalAppraisal: 89, enrollment: 40, curriculumStatus: 'Annual review complete', graduationImpact: 'Good' },
    { code: 'DS 5300', title: 'Statistical Learning', department: 'Data Science and Analytics', credits: 3, description: 'Model selection, inference, validation, and applied predictive modeling.', prerequisites: 'Statistics foundation', instructor: 'Dr. Priya Nair', requirement: 'Analytics Core', assessmentMethod: 'Project / Examination', examFormat: 'Open Book', grading: 'Project 45%, Exams 35%, Labs 20%', workload: 'Medium', researchRelevance: 'High', careerRelevance: 'High', fit: 'Strong recommendation', quality: 90, studentReviews: 92, peerTeachingAssessment: 88, departmentalAppraisal: 91, enrollment: 30, curriculumStatus: 'Reviewed Summer 2026', graduationImpact: 'Excellent' },
    { code: 'DS 5410', title: 'Data Ethics and Governance', department: 'Data Science and Analytics', credits: 3, description: 'Responsible data stewardship, governance, bias analysis, and institutional risk.', prerequisites: 'Graduate standing', instructor: 'Dr. Marcus Hill', requirement: 'Professional Core', assessmentMethod: 'Case Analysis', examFormat: 'No final exam', grading: 'Cases 50%, Policy Memo 30%, Discussion 20%', workload: 'Low', researchRelevance: 'Medium', careerRelevance: 'High', fit: 'Good alternative', quality: 84, studentReviews: 85, peerTeachingAssessment: 82, departmentalAppraisal: 86, enrollment: 25, curriculumStatus: 'Reviewed Spring 2026', graduationImpact: 'Good' },
    { code: 'DS 5990', title: 'Research Capstone', department: 'Data Science and Analytics', credits: 3, description: 'Supervised research capstone with an applied partner or faculty research group.', prerequisites: 'Advisor approval', instructor: 'Dr. Priya Nair', requirement: 'Capstone Credits', assessmentMethod: 'Research progress', examFormat: 'No exam', grading: 'Advisor evaluation 100%', workload: 'Medium', researchRelevance: 'High', careerRelevance: 'High', fit: 'Good alternative', quality: 88, studentReviews: 89, peerTeachingAssessment: 87, departmentalAppraisal: 88, enrollment: 14, curriculumStatus: 'Current', graduationImpact: 'Excellent' },
    { code: 'ENV 6200', title: 'Advanced Water Treatment', department: 'Environmental Engineering', credits: 3, description: 'Physical, chemical, and biological treatment methods for advanced water systems.', prerequisites: 'Masters-level environmental engineering', instructor: 'Dr. Elena Brooks', requirement: 'Specialization Core', assessmentMethod: 'Project / Examination', examFormat: 'Closed Book', grading: 'Project 35%, Exams 45%, Labs 20%', workload: 'Medium', researchRelevance: 'High', careerRelevance: 'High', fit: 'Strong recommendation', quality: 93, studentReviews: 94, peerTeachingAssessment: 92, departmentalAppraisal: 93, enrollment: 18, curriculumStatus: 'Reviewed Spring 2026', graduationImpact: 'Excellent' },
    { code: 'ENV 6310', title: 'Environmental Sensor Networks', department: 'Environmental Engineering', credits: 3, description: 'Sensor placement, field-data quality, environmental monitoring, and analytics workflows.', prerequisites: 'Graduate standing', instructor: 'Dr. Hannah Ortiz', requirement: 'Technical Elective', assessmentMethod: 'Field Project', examFormat: 'No final exam', grading: 'Project 60%, Lab Notebook 25%, Presentation 15%', workload: 'Low', researchRelevance: 'High', careerRelevance: 'Medium', fit: 'Good alternative', quality: 87, studentReviews: 86, peerTeachingAssessment: 88, departmentalAppraisal: 88, enrollment: 16, curriculumStatus: 'Reviewed Fall 2025', graduationImpact: 'Excellent' },
    { code: 'ENV 6900', title: 'Doctoral Research', department: 'Environmental Engineering', credits: 3, description: 'Supervised doctoral research toward proposal and dissertation milestones.', prerequisites: 'Advisor approval', instructor: 'Dr. Elena Brooks', requirement: 'Research Credits', assessmentMethod: 'Research progress', examFormat: 'No exam', grading: 'Advisor evaluation 100%', workload: 'Variable', researchRelevance: 'High', careerRelevance: 'High', fit: 'Good alternative', quality: 91, studentReviews: 90, peerTeachingAssessment: 92, departmentalAppraisal: 91, enrollment: 12, curriculumStatus: 'Current', graduationImpact: 'Good' }
  ],
  degreeRequirements: [
    { name: 'Core Requirements', required: 18, completed: 18, status: 'Completed' },
    { name: 'Research Credits', required: 24, completed: 9, status: 'In Progress' },
    { name: 'Electives', required: 18, completed: 3, status: 'In Progress' },
    { name: 'Seminar Credits', required: 3, completed: 0, status: 'Remaining' },
    { name: 'Milestones', required: 9, completed: 0, status: 'In Progress' }
  ],
  milestones: [
    { name: 'Program of Study', complete: true, status: 'Completed', target: 'Fall 2025', description: 'Initial plan approved by the department.', action: 'Review during annual advising.' },
    { name: 'Research Advisor Selected', complete: true, status: 'Completed', target: 'Spring 2026', description: 'Primary advisor recorded.', action: 'Confirm research goals each semester.' },
    { name: 'Annual Progress Review', complete: true, status: 'Completed', target: 'Fall 2026', description: 'First annual review completed.', action: 'Prepare materials for the next review.' },
    { name: 'Qualifying Examination', complete: false, status: 'Preparation Recommended', target: 'Spring 2027', description: 'Departmental qualifying examination.', action: 'Begin preparation this semester based on the selected graduation timeline.' },
    { name: 'Dissertation Proposal', complete: false, status: 'Remaining', target: 'Fall 2027', description: 'Proposal defense before committee.', action: 'Discuss committee timing with advisor.' },
    { name: 'Dissertation Defense', complete: false, status: 'Remaining', target: 'Spring 2029', description: 'Final public defense.', action: 'Maintain dissertation research credits.' }
  ],
  announcements: [
    { title: 'Fall 2026 Registration Window', body: 'Graduate students should review recommended plans and discuss choices with advisors before registration.' },
    { title: 'Curriculum Information Reviewed', body: 'Computer Science, Data Science, and Environmental Engineering graduate requirements have current catalog reviews.' },
    { title: 'Qualifying Examination Preparation Session', body: 'The Graduate Education office added a preparation session for doctoral students entering the expected exam window.' }
  ],
  academicHistory: [
    { semester: 'Fall 2025', semesterGpa: '3.78', cumulativeGpa: '3.78', courses: [
      { code: 'CS 5001', title: 'Research Methods', grade: 'A', credits: 3 },
      { code: 'CS 5200', title: 'Machine Learning', grade: 'B+', credits: 3 },
      { code: 'CS 6010', title: 'Graduate Research Seminar', grade: 'A', credits: 1 }
    ] },
    { semester: 'Spring 2026', semesterGpa: '3.67', cumulativeGpa: '3.72', courses: [
      { code: 'CS 5500', title: 'Advanced Machine Learning', grade: 'A-', credits: 3 },
      { code: 'CS 6990', title: 'Dissertation Research', grade: 'S', credits: 3 }
    ] }
  ],
  recommendationBasis: [
    'Program requirement',
    'Prerequisites',
    'Student academic history',
    'Research-interest alignment',
    'Course availability',
    'Historical course outcomes',
    'Recent course review',
    'Workload compatibility',
    'Graduation timeline'
  ],
  notifications: ['Course information available', 'Milestone approaching', 'Degree requirement updated', 'Advisor recommendation available'],
  updates: [
    { time: '2 minutes ago', message: 'CS 5500 assessment information updated.' },
    { time: '5 minutes ago', message: 'Degree audit synchronized.' },
    { time: '8 minutes ago', message: 'Fall 2026 course schedule synchronized.' }
  ],
  logs: [
    'Course catalog synchronized',
    'Registrar reviewed assessment information',
    'Degree audit records synchronized',
    'Academic Decision Engine generated roadmap'
  ]
};
