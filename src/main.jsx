import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {
  Bell, BookOpen, Building2, CalendarCheck, CheckCircle2, ClipboardList,
  Database, GraduationCap, LayoutDashboard, Library, Menu, Search, Settings, ShieldCheck,
  UserRound, UsersRound, Wrench
} from 'lucide-react';
import './styles.css';
import { seedData } from './data/seedData.js';
import { storageGet, storageSet } from './utils/storage.js';

const AppContext = createContext(null);

function AppProvider({ children }) {
  const [courses, setCourses] = useState(() => storageGet('courses', seedData.courses));
  const [faculty, setFaculty] = useState(() => storageGet('faculty', seedData.faculty));
  const [requirements, setRequirements] = useState(() => storageGet('requirements', seedData.degreeRequirements));
  const [students, setStudents] = useState(() => storageGet('students', seedData.students));
  const [selectedStudentId, setSelectedStudentId] = useState(() => storageGet('selectedStudentId', seedData.students[0].id));
  const [authenticatedRole, setAuthenticatedRole] = useState(() => storageGet('authenticatedRole', ''));
  const [assessmentAssignments, setAssessmentAssignments] = useState(() => storageGet('assessmentAssignments', {}));
  const [updates, setUpdates] = useState(() => storageGet('updates', seedData.updates));
  const profile = students.find((student) => student.id === selectedStudentId) || students[0];

  const pushUpdate = (message) => {
    const next = [{ time: 'Just now', message }, ...updates].slice(0, 8);
    setUpdates(next);
    storageSet('updates', next);
  };
  const saveCourses = (next) => { setCourses(next); storageSet('courses', next); pushUpdate('Course information synchronized.'); };
  const saveFaculty = (next) => { setFaculty(next); storageSet('faculty', next); pushUpdate('Faculty directory synchronized.'); };
  const saveRequirements = (next) => { setRequirements(next); storageSet('requirements', next); pushUpdate('Degree requirement information reviewed.'); };
  const saveProfile = (next) => {
    const nextStudents = students.map((student) => student.id === next.id ? next : student);
    setStudents(nextStudents);
    storageSet('students', nextStudents);
    pushUpdate('Student verification details updated.');
  };
  const saveAssessmentAssignment = (courseCode, assignment) => {
    const next = { ...assessmentAssignments, [courseCode]: assignment };
    setAssessmentAssignments(next);
    storageSet('assessmentAssignments', next);
    pushUpdate(`Assessment assignment saved for ${courseCode}.`);
  };
  const selectStudent = (id) => {
    setSelectedStudentId(id);
    storageSet('selectedStudentId', id);
  };
  const authenticate = (role) => {
    setAuthenticatedRole(role);
    storageSet('authenticatedRole', role);
  };
  const clearAuthentication = () => {
    setAuthenticatedRole('');
    storageSet('authenticatedRole', '');
  };

  const value = useMemo(() => ({
    ...seedData,
    courses,
    faculty,
    requirements,
    students,
    profile,
    authenticatedRole,
    assessmentAssignments,
    updates,
    saveCourses,
    saveFaculty,
    saveRequirements,
    saveProfile,
    saveAssessmentAssignment,
    selectStudent,
    authenticate,
    clearAuthentication
  }), [courses, faculty, requirements, students, profile, authenticatedRole, assessmentAssignments, updates]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
const useApp = () => useContext(AppContext);

function Header() {
  const { notifications } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  return <header className="topbar">
    <Link to="/" className="brand"><GraduationCap aria-hidden /> <span>Academic Navigator</span></Link>
    <nav className="toplinks" aria-label="Primary">
      <NavLink to="/login">Sign In</NavLink>
      <NavLink to="/student">Student</NavLink>
      <NavLink to="/admin">Admin</NavLink>
      <NavLink to="/registrar">Registrar</NavLink>
      <NavLink to="/maintenance">IT</NavLink>
    </nav>
    <div className="top-actions">
      <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Open global search"><Search size={18} /></button>
      <button className="icon-btn" onClick={() => setNoticeOpen(!noticeOpen)} aria-label="Open notifications"><Bell size={18} /></button>
    </div>
    {searchOpen && <GlobalSearch />}
    {noticeOpen && <div className="popover notices" role="dialog" aria-label="Notifications">{notifications.map((n) => <p key={n}>{n}</p>)}</div>}
  </header>;
}

function GlobalSearch() {
  const data = useApp();
  const [q, setQ] = useState('');
  const pool = [
    ...data.courses.map(c => ({ type: 'Course', title: `${c.code} ${c.title}`, detail: c.requirement, to: '/student/courses' })),
    ...data.faculty.map(f => ({ type: 'Faculty', title: f.name, detail: f.specialization, to: '/admin/faculty' })),
    ...data.programs.map(p => ({ type: 'Program', title: p.name, detail: p.level, to: '/admin/programs' })),
    ...data.milestones.map(m => ({ type: 'Milestone', title: m.name, detail: m.status, to: '/student/milestones' })),
    ...data.announcements.map(a => ({ type: 'Announcement', title: a.title, detail: a.body, to: '/student/announcements' }))
  ];
  const results = q ? pool.filter(item => `${item.title} ${item.detail}`.toLowerCase().includes(q.toLowerCase())).slice(0, 8) : [];
  return <div className="popover search-panel" role="search">
    <label htmlFor="global-search">Global search</label>
    <input id="global-search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses, faculty, programs..." />
    <div className="search-results">{results.length ? results.map((r, i) => <Link key={i} to={r.to}><b>{r.type}</b><span>{r.title}</span><small>{r.detail}</small></Link>) : <p className="muted">No results yet.</p>}</div>
  </div>;
}

function Layout({ nav, children, title }) {
  const [open, setOpen] = useState(false);
  return <><Header /><div className="shell">
    <button className="mobile-menu" onClick={() => setOpen(!open)}><Menu size={18} /> Menu</button>
    <aside className={`sidebar ${open ? 'open' : ''}`}><h2>{title}</h2>{nav.map(n => <NavLink key={n.to} to={n.to} end={n.end}><n.icon size={17} />{n.label}</NavLink>)}</aside>
    <main className="content">{children}</main>
  </div></>;
}

const studentNav = [
  ['Dashboard','/student',LayoutDashboard,true], ['My Profile','/student/profile',UserRound], ['Academic Record','/student/record',BookOpen], ['Degree Progress','/student/progress',ClipboardList], ['Course Planner','/student/planner',CalendarCheck], ['Milestones','/student/milestones',CheckCircle2], ['Academic Health','/student/health',ShieldCheck], ['Course Explorer','/student/courses',Library], ['Recommendation Basis','/student/transparency',UsersRound], ['Announcements','/student/announcements',Bell]
].map(([label,to,icon,end]) => ({label,to,icon,end}));
const adminNav = [
  ['Dashboard','/admin',LayoutDashboard,true], ['Integrations','/admin/integrations',Database], ['University Information','/admin/info',Building2], ['Colleges','/admin/colleges',Library], ['Departments','/admin/departments',Building2], ['Programs','/admin/programs',GraduationCap], ['Courses','/admin/courses',BookOpen], ['Faculty','/admin/faculty',UsersRound], ['Degree Requirements','/admin/requirements',ClipboardList], ['Milestones','/admin/milestones',CheckCircle2], ['Announcements','/admin/announcements',Bell], ['Documents','/admin/documents',Library], ['Change History','/admin/history',Database]
].map(([label,to,icon,end]) => ({label,to,icon,end}));
const registrarNav = [
  ['Overview','/registrar',LayoutDashboard,true], ['Courses','/registrar/courses',BookOpen], ['Faculty','/registrar/faculty',UsersRound], ['Assessment Review','/registrar/assessment',ClipboardList], ['Faculty Assignment','/registrar/assignment',UsersRound], ['Curriculum Review','/registrar/curriculum',Library], ['Audit Information','/registrar/audit',ShieldCheck]
].map(([label,to,icon,end]) => ({label,to,icon,end}));
const itNav = [
  ['System Overview','/maintenance',LayoutDashboard,true], ['Users','/maintenance/users',UsersRound], ['Institution Accounts','/maintenance/institutions',Building2], ['System Logs','/maintenance/logs',Database], ['Backups','/maintenance/backups',Database], ['Notifications','/maintenance/notifications',Bell], ['Configuration','/maintenance/config',Settings]
].map(([label,to,icon,end]) => ({label,to,icon,end}));

function Landing() {
  return <><Header /><main className="landing">
    <section className="welcome">
      <div>
        <p className="eyebrow">University-connected academic navigation</p>
        <h1>Academic Navigator</h1>
        <p className="subtitle">Your university knows where you have been. Academic Navigator helps you decide where to go next.</p>
        <p className="advisor-note">A decision-support layer above student records, degree audit, registrar, course catalog, LMS, financial aid, and graduate education systems.</p>
        <div className="actions"><Link className="primary" to="/login">Sign in with your university</Link><span>Universities built systems to record a student's journey. We help the student navigate it.</span></div>
      </div>
    </section>
    <section className="role-grid" aria-label="Product areas">{[
      ['Student Guidance','Personalized next actions from institutional records.','/login'],
      ['Institution Administration','Connected data systems and academic rules.','/admin/integrations'],
      ['Dean / Registrar','Review curriculum, assessment, and audit evidence.','/registrar'],
      ['IT Operations','Monitor institutional data connections.','/maintenance']
    ].map(r => <Link className="role-card" to={r[2]} key={r[0]}><h2>{r[0]}</h2><p>{r[1]}</p></Link>)}</section>
  </main></>;
}

function Login() {
  const navigate = useNavigate();
  const { universities, students, selectStudent, authenticate, clearAuthentication } = useApp();
  const [role, setRole] = useState('student');
  const [institution, setInstitution] = useState(universities[0].name);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const staffAccounts = {
    admin: { username: 'admin.navigator', password: 'Navigator2026!' },
    registrar: { username: 'registrar.navigator', password: 'Navigator2026!' },
    maintenance: { username: 'it.navigator', password: 'Navigator2026!' }
  };
  const signIn = () => {
    const normalized = username.trim().toLowerCase();
    const expectedPassword = 'Navigator2026!';
    setError('');
    clearAuthentication();
    if (role === 'student') {
      const exactStudent = students.find((student) =>
        student.username.toLowerCase() === normalized ||
        student.email.toLowerCase() === normalized
      );
      if (!exactStudent || password !== expectedPassword) {
        setError('Username or password was not recognized.');
        return;
      }
      selectStudent(exactStudent.id);
      authenticate('student');
      navigate('/student');
      return;
    }
    const staffAccount = staffAccounts[role];
    if (!staffAccount || normalized !== staffAccount.username || password !== staffAccount.password) {
      setError('Username or password was not recognized.');
      return;
    }
    authenticate(role);
    navigate(`/${role}`);
  };
  return <><Header /><main className="login-page"><section className="login-card">
    <p className="mode">Welcome</p>
    <h1>Academic Navigator</h1>
    <p className="muted">Your university already has your academic information. Academic Navigator turns that information into personalized guidance.</p>
    <label>Role<select value={role} onChange={e => setRole(e.target.value)}><option value="student">Student</option><option value="admin">University Administration</option><option value="registrar">Dean / Registrar</option><option value="maintenance">IT / Maintenance</option></select></label>
    <label>University / Institution<select value={institution} onChange={e => setInstitution(e.target.value)}>{universities.map((u) => <option key={u.id}>{u.name}</option>)}</select></label>
    <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" /></label>
    <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" /></label>
    {error && <p className="error-message" role="alert">{error}</p>}
    <button className="primary" onClick={signIn}>Sign In</button>
  </section></main></>;
}

function Card({ title, value, detail }) { return <article className="card"><h3>{title}</h3><strong>{value}</strong>{detail && <p>{detail}</p>}</article>; }
function Status({ children, tone='good' }) { return <span className={`status ${tone}`}>{children}</span>; }
function Progress({ value }) { return <div className="progress" aria-label={`${value}% complete`}><span style={{ width: `${value}%` }} /></div>; }
function Updates() { const { updates } = useApp(); return <section className="panel"><h2>Live Institutional Updates</h2>{updates.map(u => <p className="update" key={u.time + u.message}><b>{u.time}</b> - {u.message}</p>)}</section>; }
function PageTitle({ title, subtitle }) { return <div className="page-title"><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>; }

function StudentSwitcher() {
  const { students, profile, selectStudent } = useApp();
  return <label className="student-switcher">Student record<select value={profile.id} onChange={(e) => selectStudent(e.target.value)}>{students.map((student) => <option key={student.id} value={student.id}>{student.fullName} - {student.program}</option>)}</select></label>;
}

function getRecommendedCourses(courses, profile) {
  return profile.recommendationCodes.map((code) => courses.find((course) => course.code === code)).filter(Boolean);
}

function StudentDashboard() {
  const { profile, courses } = useApp();
  const recommended = getRecommendedCourses(courses, profile);
  return <><div className="title-row"><PageTitle title={`Good morning, ${profile.firstName}`} subtitle="We analyzed your academic record, program requirements, current enrollment, previous coursework, and upcoming academic milestones." /><StudentSwitcher /></div>
    <section className="panel"><h2>Your Academic Position</h2><div className="position-grid">
      <div><b>{profile.degreeLevel} - {profile.department}</b><span>{profile.profileSummary}</span></div>
      <div><b>Program Semester</b><span>{profile.programSemester}</span></div>
      <div><b>Credits Completed</b><span>{profile.creditsCompleted}</span></div>
      <div><b>CGPA</b><span>{profile.cgpa}</span></div>
      <div><b>Required Credits Remaining</b><span>{profile.creditsRemaining}</span></div>
      <div><b>Target Graduation</b><span>{profile.expectedGraduation}</span></div>
      <div><b>Current Assistantship</b><span>{profile.assistantship}</span></div>
      {profile.creditsReducedByMasters && <div><b>Masters Credit Reduction</b><span>{profile.creditsReducedByMasters} credits</span></div>}
    </div></section>
    <Recommendations courses={recommended} />
    <MilestoneFocus profile={profile} />
  </>;
}

function Recommendations({ courses }) {
  return <section className="panel"><h2>What Should You Do Next?</h2><p className="muted">Recommended for Fall 2026</p><div className="stack">{courses.map((course, index) => <article className="recommendation" key={course.code}>
    <div><span className="rank">{index + 1}</span><h3>{course.code} - {course.title}</h3><Status tone={index === 0 ? 'good' : 'neutral'}>{course.fit}</Status></div>
    <p><b>Why?</b> Satisfies {course.requirement}. Aligns with declared academic goals. Prerequisites are complete or already represented in the academic record. Course health is {course.quality}/100. Workload is {course.workload.toLowerCase()} and the graduation impact is {course.graduationImpact.toLowerCase()}.</p>
    <Link className="text-link" to="/student/transparency">Why am I seeing this recommendation?</Link>
  </article>)}</div></section>;
}

function MilestoneFocus({ profile }) {
  return <section className="panel highlight"><h2>Important Upcoming Milestone</h2><h3>{profile.milestoneFocus}</h3><p>Based on completed coursework, program requirements, assistantship constraints, and desired graduation date, this is the recommended milestone to address next.</p><p><b>Recommended action:</b> Begin preparation this semester and confirm timing with the advisor or graduate coordinator.</p></section>;
}

function Profile() {
  const { profile, saveProfile } = useApp();
  const [draft, setDraft] = useState(profile);
  const update = e => setDraft({ ...draft, [e.target.name]: e.target.value });
  const fields = [
    ['Personal Information', [
      ['firstName', 'First Name'],
      ['fullName', 'Full Name'],
      ['studentId', 'Student ID'],
      ['email', 'Email'],
      ['internationalStatus', 'International Status']
    ]],
    ['Academic Program & Enrollment', [
      ['university', 'University'],
      ['college', 'College'],
      ['department', 'Department'],
      ['program', 'Program'],
      ['degreeLevel', 'Degree Level']
    ]],
    ['Timeline & Progress', [
      ['programStart', 'Program Start'],
      ['currentSemester', 'Current Semester'],
      ['expectedGraduation', 'Expected Graduation']
    ]],
    ['Advising & Committee', [
      ['advisor', 'Advisor'],
      ['coAdvisor', 'Co-Advisor'],
      ['committeeMembers', 'Committee Members']
    ]],
    ['Planning Ahead', [
      ['researchInterests', 'Research Interests'],
      ['careerGoal', 'Career Goal']
    ]]
  ];
  const valueFor = (key) => Array.isArray(draft[key]) ? draft[key].join(', ') : draft[key] ?? '';
  const updateField = (key, value) => setDraft({ ...draft, [key]: key === 'committeeMembers' ? value.split(',').map((item) => item.trim()).filter(Boolean) : value });
  return <><PageTitle title="Verify Your Information" subtitle="Academic facts are imported from institutional systems. Use this page to verify facts and add planning intentions the university may not already know." />
    <section className="stack">{fields.map(([section, sectionFields]) => <div className="panel form-grid" key={section}><h2>{section}</h2>{sectionFields.map(([key, label]) => <label key={key}>{label}<input name={key} value={valueFor(key)} onChange={(event) => key === 'committeeMembers' ? updateField(key, event.target.value) : update(event)} /></label>)}</div>)}<button className="primary save-row" onClick={() => saveProfile(draft)}>Save Verification</button></section></>;
}

function AcademicRecord() { const { academicHistory } = useApp(); return <><PageTitle title="Academic Record" subtitle="Imported coursework, grades, and credit totals from institutional systems." /><div className="stack">{academicHistory.map(s => <section className="panel" key={s.semester}><h2>{s.semester}</h2><ResponsiveTable headers={['Course','Title','Grade','Credits']} rows={s.courses.map(c => [c.code,c.title,c.grade,c.credits])} /><p>Semester GPA: <b>{s.semesterGpa}</b> | Cumulative GPA: <b>{s.cumulativeGpa}</b></p></section>)}</div></>; }
function DegreeProgress() { const { requirements, profile } = useApp(); const total = requirements.reduce((a,r)=>a+r.required,0), done = requirements.reduce((a,r)=>a+r.completed,0); return <><PageTitle title="Degree Progress" subtitle="Degree audit facts are imported from the university and interpreted by Academic Navigator." /><section className="panel"><Progress value={Math.round(done/total*100)} /><p>{profile.creditsCompleted} credits completed. {profile.creditsRemaining} credits remaining for the current plan.</p><ResponsiveTable headers={['Requirement','Required','Completed','Remaining','Status']} rows={requirements.map(r => [r.name,r.required,r.completed,Math.max(0,r.required-r.completed),<Status tone={r.status==='Completed'?'good':r.status==='In Progress'?'warn':'neutral'}>{r.status}</Status>])} /></section></>; }
function Roadmap() { const { profile, courses } = useApp(); const rec = getRecommendedCourses(courses, profile); return <section className="panel"><h2>Upcoming Semester Roadmap</h2><p className="muted">The plan balances degree requirements, course availability, academic history, assistantship expectations, and desired graduation date.</p><ul className="clean-list">{rec.map((course) => <li key={course.code}>{course.code} {course.title} - {course.credits} credits</li>)}</ul><p>Total: <b>{rec.reduce((sum, course) => sum + Number(course.credits), 0)} credits</b>. This path preserves alternate course pathways later.</p></section>; }
function Planner() { const { profile, courses } = useApp(); const rec = getRecommendedCourses(courses, profile); return <><PageTitle title="Course Planner" subtitle="Recommendations interpret institutional records rather than asking the student to recreate them." /><Roadmap /><section className="grid-2">{rec.map(c => <CourseCard c={c} key={c.code} why={`This course satisfies ${c.requirement}, has a ${c.quality}/100 course health score, and supports ${profile.researchInterests.toLowerCase()}.`} />)}</section><Pathways /></>; }
function Pathways() { const { profile, courses } = useApp(); const departmentCourses = courses.filter(c => c.department === profile.department); return <section className="panel"><h2>Compare Alternatives</h2><ResponsiveTable headers={['Course','Requirement','Research Fit','Course Health','Workload','Graduation Impact']} rows={departmentCourses.map(c => [c.code, c.requirement, c.researchRelevance, c.quality, c.workload, c.graduationImpact])} /></section>; }
function Milestones() { const { milestones } = useApp(); return <><PageTitle title="Milestone Tracker" /><div className="timeline">{milestones.map(m => <section className="panel milestone" key={m.name}><h2>{m.complete ? 'Complete' : 'Open'}: {m.name}</h2><p><b>Status:</b> {m.status}</p><p><b>Target:</b> {m.target}</p><p>{m.description}</p><p><b>Recommended Action:</b> {m.action}</p></section>)}</div></>; }
function Health() { const { profile } = useApp(); const rows = [['Degree Progress','Good','Course and research credits are on pace.'],['CGPA','Good',`Current CGPA is ${profile.cgpa}.`],['Assistantship Eligibility','Good','Enrollment plan meets assistantship expectations.'],['Course Sequencing','Attention','Next courses should preserve alternate pathways.'],['Milestones','Attention',`${profile.milestoneFocus} is approaching.`],['Time-to-Degree','Good',`Current roadmap supports ${profile.expectedGraduation}.`],['Graduation Readiness','Good','No blocking items in institutional records.']]; return <><PageTitle title="Academic Health" /><section className="panel"><ResponsiveTable headers={['Area','Status','Explanation']} rows={rows.map(r => [r[0],<Status tone={r[1]==='Good'?'good':'warn'}>{r[1]}</Status>,r[2]])} /></section></>; }
function CourseExplorer() { const { courses } = useApp(); const [q,setQ]=useState(''); const [req,setReq]=useState('All'); const shown=courses.filter(c=>(req==='All'||c.requirement===req)&&`${c.code} ${c.title} ${c.instructor} ${c.assessmentMethod} ${c.researchRelevance} ${c.careerRelevance}`.toLowerCase().includes(q.toLowerCase())); return <><PageTitle title="Course Explorer" /><section className="panel filters"><input aria-label="Search courses" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search courses" /><select value={req} onChange={e=>setReq(e.target.value)}><option>All</option>{[...new Set(courses.map(c=>c.requirement))].map(r=><option key={r}>{r}</option>)}</select></section><div className="grid-2">{shown.length ? shown.map(c=><CourseCard c={c} key={c.code} />) : <p>No courses found.</p>}</div></>; }
function CourseCard({ c, why }) { return <article className="panel course-card"><h2>{c.code} - {c.title}</h2><p>{c.description}</p><dl><dt>Credits</dt><dd>{c.credits}</dd><dt>Prerequisites</dt><dd>{c.prerequisites}</dd><dt>Instructor</dt><dd>{c.instructor}</dd><dt>Assessment</dt><dd>{c.assessmentMethod}; {c.examFormat}</dd><dt>Grading</dt><dd>{c.grading}</dd><dt>Workload</dt><dd>{c.workload}</dd><dt>Course Health</dt><dd>{c.quality}/100</dd><dt>Student Reviews</dt><dd>{c.studentReviews}/100</dd><dt>Peer Teaching Assessment</dt><dd>{c.peerTeachingAssessment}/100</dd><dt>Departmental Appraisal</dt><dd>{c.departmentalAppraisal}/100</dd></dl>{why && <p className="why"><b>Why this course was recommended:</b> {why}</p>}</article>; }
function Transparency() {
  const { recommendationBasis, courses, profile } = useApp();
  const alternatives = courses.filter((course) => course.department === profile.department);
  return <><PageTitle title="Recommendation Basis" subtitle="The recommendation is explainable and can be reviewed with an advisor, graduate coordinator, or registrar." /><section className="panel"><h2>Recommendation Basis</h2><div className="basis-grid">{recommendationBasis.map((basis) => <div key={basis}><Status>Yes</Status><span>{basis}</span></div>)}</div><p>Alternative courses found: <b>{alternatives.length}</b></p></section><Pathways /></>;
}
function Announcements() { const { announcements }=useApp(); return <><PageTitle title="Announcements" /><div className="stack">{announcements.map(a=><article className="panel" key={a.title}><h2>{a.title}</h2><p>{a.body}</p></article>)}</div></>; }

function AdminDashboard() { const { programs,courses,faculty,updates }=useApp(); return <><PageTitle title="University Administration" subtitle="Institutional records feed the Academic Decision Engine through connected data services." /><div className="cards"><Card title="Programs" value={programs.length}/><Card title="Courses" value={courses.length}/><Card title="Faculty" value={faculty.length}/><Card title="Pending Reviews" value="4"/></div><Updates /></>; }
function Integrations() { const { integrations } = useApp(); return <><PageTitle title="University Data Connections" subtitle="Academic Navigator sits above systems of record and turns transactional data into decision support." /><section className="panel"><ResponsiveTable headers={['System','Status','Last Synchronized']} rows={integrations.map((item) => [item.system, <Status>{item.status}</Status>, item.lastSynchronized])} /></section><section className="panel architecture"><h2>Architecture</h2><p><b>Student</b> to <b>Academic Navigator</b> to Academic Decision Engine to Integration Layer to Student Records, Degree Requirements, Course Catalog, Registrar, LMS, Financial Aid, and Graduate Education.</p><p className="muted">Production deployment replaces the lower adapter layer with institution-authorized APIs or data integrations while preserving the decision engine.</p></section></>; }
function AdminCourses() { const { courses, saveCourses }=useApp(); const [editing,setEditing]=useState(null); const [draft,setDraft]=useState({}); const save=()=>{saveCourses(courses.map(c=>c.code===editing?draft:c)); setEditing(null);}; return <><PageTitle title="Course Management" /><div className="stack">{courses.map(c=><section className="panel" key={c.code}>{editing===c.code ? <EditCourse draft={draft} setDraft={setDraft} save={save} cancel={()=>setEditing(null)} /> : <><h2>{c.code} - {c.title}</h2><p>{c.description}</p><p><b>Instructor:</b> {c.instructor} | <b>Course Health:</b> {c.quality}/100 | <b>Workload:</b> {c.workload}</p><button onClick={()=>{setEditing(c.code);setDraft(c);}}>Edit</button></>}</section>)}</div></>; }
function EditCourse({draft,setDraft,save,cancel}) { const fields=['code','title','department','credits','description','prerequisites','instructor','requirement','assessmentMethod','examFormat','grading','workload','researchRelevance','careerRelevance','quality','studentReviews','peerTeachingAssessment','departmentalAppraisal']; return <div className="form-grid">{fields.map(f=><label key={f}>{toLabel(f)}<input value={draft[f] ?? ''} onChange={e=>setDraft({...draft,[f]:e.target.value})}/></label>)}<button className="primary" onClick={save}>Save</button><button onClick={cancel}>Cancel</button><p className="muted">Information updated successfully after saving.</p></div>; }
function AdminFaculty() { const { faculty, saveFaculty }=useApp(); const empty={name:'',department:'Computer Science',specialization:'',courses:'',load:'Low',availability:'Available',status:'Active'}; const [draft,setDraft]=useState(empty); const add=()=>{saveFaculty([...faculty,{...draft,courses:String(draft.courses).split(',').map(s=>s.trim())}]);setDraft(empty);}; return <><PageTitle title="Faculty Management" /><section className="panel"><ResponsiveTable headers={['Name','Department','Specialization','Courses','Teaching Load','Availability','Status']} rows={faculty.map(f=>[f.name,f.department,f.specialization,Array.isArray(f.courses)?f.courses.join(', '):f.courses,f.load,f.availability,f.status])}/></section><section className="panel form-grid"><h2>Add Faculty</h2>{Object.keys(empty).map(k=><label key={k}>{toLabel(k)}<input value={draft[k]} onChange={e=>setDraft({...draft,[k]:e.target.value})}/></label>)}<button className="primary" onClick={add}>Add Faculty</button></section></>; }
function AdminRequirements() { const { requirements, saveRequirements }=useApp(); const [draft,setDraft]=useState(requirements); const update=(i,k,v)=>setDraft(draft.map((r,idx)=>idx===i?{...r,[k]:k==='name'||k==='status'?v:Number(v)}:r)); return <><PageTitle title="Degree Requirements" subtitle="Requirement rules are maintained institutionally and interpreted against each student record."/><section className="panel">{draft.map((r,i)=><div className="require-edit" key={r.name}><input value={r.name} onChange={e=>update(i,'name',e.target.value)}/><input type="number" value={r.required} onChange={e=>update(i,'required',e.target.value)}/><input type="number" value={r.completed} onChange={e=>update(i,'completed',e.target.value)}/><select value={r.status} onChange={e=>update(i,'status',e.target.value)}><option>Completed</option><option>In Progress</option><option>Remaining</option></select></div>)}<button className="primary" onClick={()=>saveRequirements(draft)}>Save Requirements</button><p>GPA requirement: 3.00. Maximum time to degree: 8 years. Students may graduate after meeting or exceeding total requirements.</p></section></>; }
function SimpleAdminPage({ title }) { return <><PageTitle title={title}/><section className="panel"><p>This workspace shows institutional records and review workflows that feed academic decision support.</p><Updates /></section></>; }

function RegistrarOverview() { return <><PageTitle title="Dean / Registrar Portal" /><div className="cards"><Card title="Courses Reviewed" value="18"/><Card title="Assessment Items" value="31"/><Card title="Faculty Assignments" value="12"/><Card title="Curriculum Status" value="Current"/></div><Updates /></>; }
function AssessmentReview() { const { courses }=useApp(); return <><PageTitle title="Assessment Transparency" /><section className="panel"><ResponsiveTable headers={['Course','Faculty','Enrollment','Assessment','Exam','Grading','Student Reviews','Peer Assessment','Departmental Appraisal']} rows={courses.map(c=>[`${c.code} ${c.title}`,c.instructor,c.enrollment,c.assessmentMethod,c.examFormat,c.grading,c.studentReviews,c.peerTeachingAssessment,c.departmentalAppraisal])}/></section></>; }
function FacultyAssignment() {
  const { courses, faculty, assessmentAssignments, saveAssessmentAssignment } = useApp();
  const [course, setCourse] = useState(courses[0].code);
  const [savedMessage, setSavedMessage] = useState('');
  const selected = courses.find(c => c.code === course) || courses[0];
  const appropriate = faculty.filter(f => f.department === selected.department && f.availability === 'Available');
  const instructor = appropriate.find(f => f.name === selected.instructor) || appropriate[0];
  const independent = appropriate.filter(f => f.name !== selected.instructor);
  const paperFaculty = independent[0] || instructor;
  const evaluationFaculty = independent.find(f => f.name !== paperFaculty.name) || independent[0] || instructor;
  const moderator = independent.find(f => ![paperFaculty.name, evaluationFaculty.name].includes(f.name)) || independent[0] || instructor;
  const highStakes = /closed book|quiz|midterm|examination/i.test(`${selected.examFormat} ${selected.grading} ${selected.assessmentMethod}`);
  const suggestedAssignment = {
    instructor: instructor?.name || '',
    paperCreator: paperFaculty?.name || '',
    evaluator: evaluationFaculty?.name || '',
    moderator: moderator?.name || ''
  };
  const [draft, setDraft] = useState(assessmentAssignments[selected.code] || suggestedAssignment);
  useEffect(() => {
    setDraft(assessmentAssignments[selected.code] || suggestedAssignment);
    setSavedMessage('');
  }, [course, assessmentAssignments, selected.code, suggestedAssignment.instructor, suggestedAssignment.paperCreator, suggestedAssignment.evaluator, suggestedAssignment.moderator]);
  const conflicts = [];
  if (highStakes && draft.paperCreator === draft.evaluator) conflicts.push('For high-accountability assessments, paper creation and evaluation should be assigned to separate faculty.');
  if (highStakes && draft.instructor === draft.paperCreator) conflicts.push('For high-accountability assessments, the course instructor should not be the only assessment paper creator.');
  if (highStakes && draft.instructor === draft.evaluator) conflicts.push('For high-accountability assessments, the course instructor should not be the only evaluator.');
  const hasConflicts = conflicts.length > 0;
  const setRole = (key, value) => setDraft({ ...draft, [key]: value });
  const facultySelect = (key) => <select value={draft[key] || ''} onChange={(event) => setRole(key, event.target.value)}>{appropriate.map(f=><option key={f.name} value={f.name}>{f.name}</option>)}</select>;
  const save = () => {
    if (hasConflicts) return;
    saveAssessmentAssignment(selected.code, { ...draft, approvedAt: 'Just now', approvedBy: 'Dean / Registrar' });
    setSavedMessage('Assignment saved for registrar review.');
  };
  const rows = [
    ['Course Instructor', facultySelect('instructor'), 'Runs the course and delivers instruction.', highStakes ? 'Instructional ownership is recorded separately from assessment creation and evaluation.' : 'Instructional ownership recorded.'],
    ['Assessment Paper Creator', facultySelect('paperCreator'), 'Forms exam papers, major quizzes, prompts, and rubrics.', 'Can be changed by Dean / Registrar before approval.'],
    ['Evaluation Faculty', facultySelect('evaluator'), 'Evaluates exams, major quizzes, and midterm work against the approved rubric.', 'Independent evaluation supports student and instructor accountability.'],
    ['Moderator / Reviewer', facultySelect('moderator'), 'Reviews paper quality, grading consistency, and conflict concerns.', 'Provides oversight before results are finalized.']
  ];
  return <><PageTitle title="Faculty Assignment" subtitle="Separate instructional, assessment-creation, evaluation, and moderation responsibilities for accountable course review." />
    <section className="panel form-grid">
      <label>Selected Course<select value={course} onChange={e=>setCourse(e.target.value)}>{courses.map(c=><option key={c.code} value={c.code}>{c.code} - {c.title}</option>)}</select></label>
      <label>Assessment Risk<input readOnly value={highStakes ? 'Higher accountability: quizzes/exams/midterms detected' : 'Standard accountability'} /></label>
      <label>Assessment Format<input readOnly value={`${selected.assessmentMethod}; ${selected.examFormat}`} /></label>
      <label>Grading Structure<input readOnly value={selected.grading} /></label>
    </section>
    <section className="panel"><h2>Suggested Assignment For Approval</h2><p className="muted">Academic Navigator recommends separation of duties. Dean / Registrar selects the official faculty assignments.</p><ResponsiveTable headers={['Role','Assigned Faculty','Responsibility','Accountability Control']} rows={rows}/>{hasConflicts && <div className="warning-box" role="alert">{conflicts.map((conflict) => <p key={conflict}>{conflict}</p>)}</div>}<div className="button-row"><button className="primary" onClick={save} disabled={hasConflicts}>Save Assignment</button><button onClick={() => setDraft(suggestedAssignment)}>Reset To Suggested</button></div>{savedMessage && <p className="success-message">{savedMessage}</p>}</section>
    <section className="panel"><h2>Available Faculty Pool</h2><ResponsiveTable headers={['Faculty','Expertise','Availability','Current Workload','Conflict']} rows={appropriate.map(f=>[f.name,f.specialization,f.availability,f.load,f.conflict])}/></section>
  </>;
}
function RegistrarCourses() { const { courses }=useApp(); return <><PageTitle title="Dean Course Review"/><section className="panel"><ResponsiveTable headers={['Course','Faculty','Enrollment','Assessment Format','Grading Criteria','Course Health','Curriculum Status']} rows={courses.map(c=>[`${c.code} ${c.title}`,c.instructor,c.enrollment,c.assessmentMethod,c.grading,c.quality,c.curriculumStatus])}/></section></>; }
function MaintenanceOverview() { return <><PageTitle title="IT / Maintenance Portal" /><div className="cards"><Card title="System Status" value="Operational"/><Card title="Data Layer" value="Connected"/><Card title="Authentication" value="Institutional"/><Card title="Last Backup" value="Today"/><Card title="Active Institutions" value="2"/><Card title="Users" value="24"/></div><SystemLogs /></>; }
function SystemLogs() { const { logs }=useApp(); return <section className="panel"><h2>System Activity Log</h2>{logs.map(l=><p className="update" key={l}>{l}</p>)}</section>; }

function toLabel(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}
function ResponsiveTable({ headers, rows }) { return <div className="table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.length ? rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}>{c}</td>)}</tr>) : <tr><td colSpan={headers.length}>No data available.</td></tr>}</tbody></table></div>; }

function RequireRole({ role, children }) {
  const { authenticatedRole } = useApp();
  return authenticatedRole === role ? children : <Navigate to="/login" replace />;
}

function StudentRoutes() { return <Layout nav={studentNav} title="Student Portal"><Routes><Route index element={<StudentDashboard/>}/><Route path="profile" element={<Profile/>}/><Route path="record" element={<AcademicRecord/>}/><Route path="progress" element={<DegreeProgress/>}/><Route path="planner" element={<Planner/>}/><Route path="milestones" element={<Milestones/>}/><Route path="health" element={<Health/>}/><Route path="courses" element={<CourseExplorer/>}/><Route path="transparency" element={<Transparency/>}/><Route path="announcements" element={<Announcements/>}/></Routes></Layout>; }
function AdminRoutes() { return <Layout nav={adminNav} title="Administration"><Routes><Route index element={<AdminDashboard/>}/><Route path="integrations" element={<Integrations/>}/><Route path="courses" element={<AdminCourses/>}/><Route path="faculty" element={<AdminFaculty/>}/><Route path="requirements" element={<AdminRequirements/>}/>{['info','colleges','departments','programs','milestones','announcements','documents','history'].map(p=><Route key={p} path={p} element={<SimpleAdminPage title={toLabel(p)}/>}/>)}</Routes></Layout>; }
function RegistrarRoutes() { return <Layout nav={registrarNav} title="Dean / Registrar"><Routes><Route index element={<RegistrarOverview/>}/><Route path="courses" element={<RegistrarCourses/>}/><Route path="assessment" element={<AssessmentReview/>}/><Route path="assignment" element={<FacultyAssignment/>}/>{['faculty','curriculum','audit'].map(p=><Route key={p} path={p} element={<SimpleAdminPage title={toLabel(p)}/>}/>)}</Routes></Layout>; }
function MaintenanceRoutes() { return <Layout nav={itNav} title="Maintenance"><Routes><Route index element={<MaintenanceOverview/>}/>{['users','institutions','logs','backups','notifications','config'].map(p=><Route key={p} path={p} element={p==='logs'?<SystemLogs/>:<SimpleAdminPage title={toLabel(p)}/>}/>)}</Routes></Layout>; }

function App() {
  return <AppProvider><HashRouter><Routes><Route path="/" element={<Landing/>}/><Route path="/login" element={<Login/>}/><Route path="/student/*" element={<RequireRole role="student"><StudentRoutes/></RequireRole>}/><Route path="/admin/*" element={<RequireRole role="admin"><AdminRoutes/></RequireRole>}/><Route path="/registrar/*" element={<RequireRole role="registrar"><RegistrarRoutes/></RequireRole>}/><Route path="/maintenance/*" element={<RequireRole role="maintenance"><MaintenanceRoutes/></RequireRole>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></HashRouter></AppProvider>;
}

createRoot(document.getElementById('root')).render(<App />);
