export const seedData = {
  universities: [
    { id: 'mtu', name: 'Missouri Tech University', note: 'Fictional demo institution' },
    { id: 'nvu', name: 'North Valley University', note: 'Fictional demo institution' }
  ],
  colleges: [
    { name: 'College of Computing and Engineering', university: 'Missouri Tech University' },
    { name: 'Graduate College of Applied Sciences', university: 'North Valley University' }
  ],
  departments: [
    { name: 'Computer Science', college: 'College of Computing and Engineering' },
    { name: 'Electrical and Data Systems', college: 'College of Computing and Engineering' }
  ],
  programs: [
    { name: 'PhD in Computer Science', level: 'Doctoral', credits: 80, seminarCredits: 3, researchCredits: 40, maxSemesterCredits: 10 },
    { name: 'MS in Data Systems - Research Track', level: 'Masters', credits: 30, researchCredits: 10, seminarCredits: 2 },
    { name: 'MS in Applied Computing - Coursework Track', level: 'Masters', credits: 30, researchCredits: 0, seminarCredits: 0 }
  ],
  students: [{
    firstName: 'Alex',
    fullName: 'Alex Morgan',
    university: 'Missouri Tech University',
    college: 'College of Computing and Engineering',
    department: 'Computer Science',
    program: 'PhD Computer Science',
    degreeLevel: 'Doctoral',
    internationalStatus: 'International student',
    studentId: 'DEMO-10427',
    email: 'alex.morgan@example.edu',
    programStart: 'Fall 2025',
    currentSemester: 'Spring 2027',
    expectedGraduation: 'Spring 2029',
    advisor: 'Dr. Maya Patel',
    coAdvisor: 'Dr. Daniel Chen',
    committeeMembers: ['Dr. Sarah Wilson', 'Dr. Omar Reed']
  }],
  faculty: [
    { name: 'Dr. Maya Patel', department: 'Computer Science', specialization: 'Machine Learning', courses: ['CS 5500'], load: 'Moderate', availability: 'Available', status: 'Active', conflict: 'None' },
    { name: 'Dr. Daniel Chen', department: 'Computer Science', specialization: 'Computer Vision', courses: ['CS 5600'], load: 'Low', availability: 'Available', status: 'Active', conflict: 'None' },
    { name: 'Dr. Sarah Wilson', department: 'Computer Science', specialization: 'Machine Learning', courses: ['CS 5200'], load: 'High', availability: 'Unavailable', status: 'Active', conflict: 'Advisor committee' },
    { name: 'Dr. Omar Reed', department: 'Computer Science', specialization: 'Natural Language Processing', courses: ['CS 5700'], load: 'Moderate', availability: 'Available', status: 'Active', conflict: 'None' },
    { name: 'Dr. Elena Brooks', department: 'Electrical and Data Systems', specialization: 'Data Systems', courses: ['DS 5400'], load: 'Low', availability: 'Available', status: 'Active', conflict: 'None' }
  ],
  courses: [
    { code: 'CS 5001', title: 'Research Methods', department: 'Computer Science', credits: 3, description: 'Introduces graduate research design, literature review, reproducibility, and scholarly communication.', prerequisites: 'Graduate standing', instructor: 'Dr. Sarah Wilson', requirement: 'Core Requirements', assessmentMethod: 'Project / Written', examFormat: 'Open Book', grading: 'Paper 40%, Presentation 20%, Assignments 40%', workload: 'Moderate', researchRelevance: 'Research foundations', careerRelevance: 'Academic and industry research', fit: 'Research-oriented', quality: 'Recently reviewed', enrollment: 22, curriculumStatus: 'Current' },
    { code: 'CS 5100', title: 'Advanced Algorithms', department: 'Computer Science', credits: 3, description: 'Advanced algorithmic analysis with applications in optimization, data structures, and complexity.', prerequisites: 'Algorithms background', instructor: 'Dr. Omar Reed', requirement: 'Core Requirements', assessmentMethod: 'Written Examination', examFormat: 'Closed Book', grading: 'Midterm 25%, Final 35%, Assignments 40%', workload: 'High', researchRelevance: 'Theory and systems research', careerRelevance: 'Technical interviews and systems work', fit: 'Strong alignment', quality: 'Reviewed Spring 2026', enrollment: 28, curriculumStatus: 'Current' },
    { code: 'CS 5200', title: 'Machine Learning', department: 'Computer Science', credits: 3, description: 'Graduate survey of supervised, unsupervised, and probabilistic machine learning methods.', prerequisites: 'Linear algebra and statistics', instructor: 'Dr. Sarah Wilson', requirement: 'Core Requirements', assessmentMethod: 'Mixed', examFormat: 'Open Book', grading: 'Assignments 30%, Project 30%, Exams 40%', workload: 'High', researchRelevance: 'Machine learning research', careerRelevance: 'Applied AI roles', fit: 'Strong alignment', quality: 'Recently reviewed', enrollment: 34, curriculumStatus: 'Current' },
    { code: 'CS 5500', title: 'Advanced Machine Learning', department: 'Computer Science', credits: 3, description: 'Advanced topics in representation learning, model evaluation, and responsible deployment.', prerequisites: 'CS 5200', instructor: 'Dr. Maya Patel', requirement: 'Advanced Computing Elective', assessmentMethod: 'Written Examination / Project', examFormat: 'Closed Book', grading: 'Midterm 25%, Final 35%, Assignments 20%, Project 20%', workload: 'High', researchRelevance: 'Strong alignment', careerRelevance: 'Research-oriented', fit: 'Strong alignment', quality: 'Reviewed Spring 2026', enrollment: 26, curriculumStatus: 'Current' },
    { code: 'CS 5600', title: 'Computer Vision', department: 'Computer Science', credits: 3, description: 'Image formation, recognition, segmentation, deep vision models, and responsible evaluation.', prerequisites: 'CS 5200 recommended', instructor: 'Dr. Daniel Chen', requirement: 'Advanced Computing Elective', assessmentMethod: 'Project / Presentation', examFormat: 'No final exam', grading: 'Assignments 35%, Project 45%, Presentation 20%', workload: 'Moderate', researchRelevance: 'Strong alignment', careerRelevance: 'Industry-oriented', fit: 'Potential fit', quality: 'Reviewed Spring 2026', enrollment: 21, curriculumStatus: 'Current' },
    { code: 'CS 5700', title: 'Natural Language Processing', department: 'Computer Science', credits: 3, description: 'Language modeling, information extraction, evaluation, and applied NLP systems.', prerequisites: 'CS 5200 recommended', instructor: 'Dr. Omar Reed', requirement: 'Advanced Computing Elective', assessmentMethod: 'Mixed', examFormat: 'Open Book', grading: 'Assignments 30%, Quiz 20%, Project 50%', workload: 'Moderate', researchRelevance: 'Research-oriented', careerRelevance: 'Strong alignment', fit: 'Potential fit', quality: 'Reviewed Fall 2025', enrollment: 24, curriculumStatus: 'Current' },
    { code: 'CS 6010', title: 'Graduate Research Seminar', department: 'Computer Science', credits: 1, description: 'Seminar on research communication, ethics, and current departmental scholarship.', prerequisites: 'Graduate standing', instructor: 'Dr. Maya Patel', requirement: 'Seminar Credits', assessmentMethod: 'Participation', examFormat: 'No exam', grading: 'Participation 60%, Reflection 40%', workload: 'Low', researchRelevance: 'Broad research exposure', careerRelevance: 'Professional communication', fit: 'Lower estimated workload', quality: 'Annual review complete', enrollment: 40, curriculumStatus: 'Current' },
    { code: 'CS 6990', title: 'Dissertation Research', department: 'Computer Science', credits: 3, description: 'Supervised doctoral research toward dissertation milestones.', prerequisites: 'Advisor approval', instructor: 'Dr. Maya Patel', requirement: 'Research / Dissertation Credits', assessmentMethod: 'Research progress', examFormat: 'No exam', grading: 'Advisor evaluation 100%', workload: 'Variable', researchRelevance: 'Dissertation progress', careerRelevance: 'Research portfolio', fit: 'Research-oriented', quality: 'Advisor reviewed', enrollment: 18, curriculumStatus: 'Current' }
  ],
  degreeRequirements: [
    { name: 'Core Requirements', required: 18, completed: 18, status: 'Completed' },
    { name: 'Research Credits', required: 10, completed: 9, status: 'In Progress' },
    { name: 'Electives', required: 12, completed: 6, status: 'In Progress' },
    { name: 'Free Electives', required: 7, completed: 6, status: 'In Progress' },
    { name: 'Seminar Credits', required: 3, completed: 1, status: 'In Progress' },
    { name: 'Dissertation Credits', required: 30, completed: 8, status: 'In Progress' },
    { name: 'Milestones', required: 0, completed: 0, status: 'In Progress' }
  ],
  milestones: [
    { name: 'Program of Study', complete: true, status: 'Completed', target: 'Fall 2025', description: 'Initial plan approved by the department.', action: 'Review during annual advising.' },
    { name: 'Research advisor selected', complete: true, status: 'Completed', target: 'Spring 2026', description: 'Primary advisor recorded.', action: 'Confirm research goals each semester.' },
    { name: 'Annual progress review', complete: true, status: 'Completed', target: 'Fall 2026', description: 'First annual review completed.', action: 'Prepare materials for the next review.' },
    { name: 'Qualifying examination', complete: false, status: 'Preparation recommended', target: 'Spring 2027', description: 'Departmental qualifying examination.', action: "Begin preparation this semester based on the student's selected graduation timeline." },
    { name: 'Dissertation proposal', complete: false, status: 'Remaining', target: 'Fall 2027', description: 'Proposal defense before committee.', action: 'Discuss committee timing with advisor.' },
    { name: 'Comprehensive examination', complete: false, status: 'Remaining', target: 'Spring 2028', description: 'Advanced examination after coursework.', action: 'Confirm format with graduate coordinator.' },
    { name: 'Dissertation defense', complete: false, status: 'Remaining', target: 'Spring 2029', description: 'Final public defense.', action: 'Maintain dissertation research credits.' },
    { name: 'Graduation application', complete: false, status: 'Remaining', target: 'Spring 2029', description: 'Registrar graduation filing.', action: 'Submit before institutional deadline.' }
  ],
  announcements: [
    { title: 'Spring 2027 registration window', body: 'Graduate students should review recommended plans and discuss choices with advisors before registration.' },
    { title: 'Curriculum information reviewed', body: 'Computer Science graduate requirements were reviewed for the demo catalog cycle.' },
    { title: 'Qualifying exam preparation session', body: 'A fictional departmental preparation session is listed for advising demonstration purposes.' }
  ],
  academicHistory: [
    { semester: 'Fall 2025', semesterGpa: '3.78', cumulativeGpa: '3.78', courses: [
      { code: 'CS 5001', title: 'Research Methods', grade: 'A', credits: 3 },
      { code: 'CS 5100', title: 'Advanced Algorithms', grade: 'A-', credits: 3 },
      { code: 'CS 5200', title: 'Machine Learning', grade: 'B+', credits: 3 }
    ] },
    { semester: 'Spring 2026', semesterGpa: '3.67', cumulativeGpa: '3.72', courses: [
      { code: 'CS 5500', title: 'Advanced Machine Learning', grade: 'A-', credits: 3 },
      { code: 'CS 6010', title: 'Graduate Research Seminar', grade: 'A', credits: 1 },
      { code: 'CS 6990', title: 'Dissertation Research', grade: 'S', credits: 3 }
    ] }
  ],
  assistantships: [{ studentId: 'DEMO-10427', status: 'Eligible', minCredits: 6, coveredMaxCredits: 10 }],
  courseEvaluations: [{ course: 'CS 5500', indicator: 'Course quality indicator uses fictional demo labels only.' }],
  assessmentInformation: [{ course: 'CS 5500', rubric: 'Available', outcomes: 'Aligned' }],
  notifications: ['New course information available', 'Milestone approaching', 'Degree requirement updated', 'Advisor recommendation available'],
  updates: [
    { time: '2 minutes ago', message: 'CS 5500 assessment information updated.' },
    { time: '8 minutes ago', message: 'Spring 2027 course schedule updated.' },
    { time: '15 minutes ago', message: 'Degree requirement information reviewed.' }
  ],
  logs: [
    'Admin updated CS 5500',
    'Registrar reviewed assessment information',
    'Student updated academic goal',
    'System generated roadmap'
  ]
};
