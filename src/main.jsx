import React, { createContext, useContext, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {
  Bell, BookOpen, Building2, CalendarCheck, CheckCircle2, ChevronDown, ClipboardList,
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
  const [profile, setProfile] = useState(() => storageGet('studentProfile', seedData.students[0]));
  const [updates, setUpdates] = useState(() => storageGet('updates', seedData.updates));

  const pushUpdate = (message) => {
    const next = [{ time: 'Just now', message }, ...updates].slice(0, 8);
    setUpdates(next);
    storageSet('updates', next);
  };
  const saveCourses = (next) => { setCourses(next); storageSet('courses', next); pushUpdate('Course information updated in demo storage.'); };
  const saveFaculty = (next) => { setFaculty(next); storageSet('faculty', next); pushUpdate('Faculty directory updated in demo storage.'); };
  const saveRequirements = (next) => { setRequirements(next); storageSet('requirements', next); pushUpdate('Degree requirement information reviewed.'); };
  const saveProfile = (next) => { setProfile(next); storageSet('studentProfile', next); pushUpdate('Student profile updated for advising discussion.'); };

  const value = useMemo(() => ({ ...seedData, courses, faculty, requirements, profile, updates, saveCourses, saveFaculty, saveRequirements, saveProfile }), [courses, faculty, requirements, profile, updates]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
const useApp = () => useContext(AppContext);

function Header() {
  const { notifications } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  return <header className="topbar">
    <Link to="/" className="brand"><GraduationCap aria-hidden /> <span>Graduate Advising Support</span></Link>
    <nav className="toplinks" aria-label="Primary">
      <NavLink to="/login">Demo Login</NavLink>
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
    {noticeOpen && <div className="popover notices" role="dialog" aria-label="Demo notifications">{notifications.map((n) => <p key={n}>{n}</p>)}</div>}
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
  ['Dashboard','/student',LayoutDashboard,true], ['My Profile','/student/profile',UserRound], ['Academic Record','/student/record',BookOpen], ['Degree Progress','/student/progress',ClipboardList], ['Course Planner','/student/planner',CalendarCheck], ['Milestones','/student/milestones',CheckCircle2], ['Academic Health','/student/health',ShieldCheck], ['Course Explorer','/student/courses',Library], ['Advising Transparency','/student/transparency',UsersRound], ['Announcements','/student/announcements',Bell]
].map(([label,to,icon,end]) => ({label,to,icon,end}));
const adminNav = [
  ['Dashboard','/admin',LayoutDashboard,true], ['University Information','/admin/info',Building2], ['Colleges','/admin/colleges',Library], ['Departments','/admin/departments',Building2], ['Programs','/admin/programs',GraduationCap], ['Courses','/admin/courses',BookOpen], ['Faculty','/admin/faculty',UsersRound], ['Degree Requirements','/admin/requirements',ClipboardList], ['Milestones','/admin/milestones',CheckCircle2], ['Announcements','/admin/announcements',Bell], ['Documents','/admin/documents',Library], ['Change History','/admin/history',Database]
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
      <div><p className="eyebrow">Fictional demo university data</p><h1>Free Graduate Academic Advising Support System</h1>
      <p className="subtitle">Helping graduate students make informed academic decisions, satisfy degree requirements efficiently, maintain good academic standing, and graduate on time.</p>
      <p className="advisor-note">This system complements, not replaces, guidance from faculty advisors.</p>
      <div className="actions"><Link className="primary" to="/login">Enter Demo</Link><span>The prototype uses representative university data. No real student information is used.</span></div></div>
    </section>
    <section className="role-grid" aria-label="Demo roles">{[['Student','Track progress and plan courses.','/login'],['University Administration','Maintain programs, courses, and requirements.','/login'],['Dean / Registrar','Review assessments and assign faculty.','/login'],['IT / Maintenance','Monitor the demo environment.','/login']].map(r => <Link className="role-card" to={r[2]} key={r[0]}><h2>{r[0]}</h2><p>{r[1]}</p></Link>)}</section>
  </main></>;
}

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const accounts = { student: 'student@demo.edu', admin: 'admin@demo.edu', registrar: 'registrar@demo.edu', maintenance: 'it@demo.edu' };
  return <><Header /><main className="login-page"><section className="login-card"><p className="mode">DEMO MODE</p><h1>Demo Login</h1><label>Role<select value={role} onChange={e => setRole(e.target.value)}><option value="student">Student</option><option value="admin">University Administration</option><option value="registrar">Dean / Registrar</option><option value="maintenance">IT / Maintenance</option></select></label><label>Email<input readOnly value={accounts[role]} /></label><label>Password<input value="demo-password" readOnly type="password" /></label><button className="primary" onClick={() => navigate(`/${role}`)}>Continue as Demo User</button><p className="muted">No real authentication is implemented.</p></section></main></>;
}

function Card({ title, value, detail }) { return <article className="card"><h3>{title}</h3><strong>{value}</strong>{detail && <p>{detail}</p>}</article>; }
function Status({ children, tone='good' }) { return <span className={`status ${tone}`}>{children}</span>; }
function Progress({ value }) { return <div className="progress" aria-label={`${value}% complete`}><span style={{ width: `${value}%` }} /></div>; }
function Updates() { const { updates } = useApp(); return <section className="panel"><h2>Live Demo Updates</h2>{updates.map(u => <p className="update" key={u.time + u.message}><b>{u.time}</b> - {u.message}</p>)}</section>; }

function StudentDashboard() {
  const { profile } = useApp();
  return <><PageTitle title={`Welcome, ${profile.firstName}`} subtitle={`${profile.program} | ${profile.university}`} /><div className="cards"><Card title="GPA" value="3.72" /><Card title="Credits Completed" value="48" /><Card title="Credits Remaining" value="32" /><Card title="Expected Graduation" value={profile.expectedGraduation} /></div><section className="panel"><h2>Degree Progress</h2><Progress value={60} /><p>48 / 80 credits completed</p><div className="status-row"><Status>Academic Standing: Good</Status><Status>Assistantship Eligibility: Eligible</Status><Status>Graduation Readiness: On Track</Status></div></section><section className="panel"><h2>Items Requiring Attention</h2><ul className="clean-list">{['Qualifying examination preparation','Committee formation','Register for next semester','Annual progress review'].map(x => <li key={x}>{x}</li>)}</ul></section><Roadmap /></>;
}
function PageTitle({ title, subtitle }) { return <div className="page-title"><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>; }

function Profile() {
  const { profile, saveProfile } = useApp();
  const [draft, setDraft] = useState(profile);
  const update = e => setDraft({ ...draft, [e.target.name]: e.target.value });
  return <><PageTitle title="My Profile" subtitle="Editable fields persist locally during the demo." /><section className="panel form-grid">{Object.entries(draft).map(([k,v]) => <label key={k}>{k.replace(/([A-Z])/g,' $1')}<input name={k} value={Array.isArray(v) ? v.join(', ') : v} onChange={update} disabled={['studentId','email'].includes(k)} /></label>)}<button className="primary" onClick={() => saveProfile(draft)}>Save Profile</button></section></>;
}
function AcademicRecord() { const { academicHistory } = useApp(); return <><PageTitle title="Academic Record" /><div className="stack">{academicHistory.map(s => <section className="panel" key={s.semester}><h2>{s.semester}</h2><ResponsiveTable headers={['Course','Title','Grade','Credits']} rows={s.courses.map(c => [c.code,c.title,c.grade,c.credits])} /><p>Semester GPA: <b>{s.semesterGpa}</b> | Cumulative GPA: <b>{s.cumulativeGpa}</b></p></section>)}</div></>; }
function DegreeProgress() { const { requirements } = useApp(); const total = requirements.reduce((a,r)=>a+r.required,0), done = requirements.reduce((a,r)=>a+r.completed,0); return <><PageTitle title="Degree Progress" subtitle="Degree audit uses illustrative demo data." /><section className="panel"><Progress value={Math.round(done/total*100)} /><p>{done} / {total} credits and milestones completed or in progress.</p><ResponsiveTable headers={['Requirement','Required','Completed','Remaining','Status']} rows={requirements.map(r => [r.name,r.required,r.completed,Math.max(0,r.required-r.completed),<Status tone={r.status==='Completed'?'good':r.status==='In Progress'?'warn':'neutral'}>{r.status}</Status>])} /></section></>; }
function Roadmap() { return <section className="panel"><h2>Upcoming Semester Roadmap</h2><p className="muted">Full-time minimum: 6 credits. Funding coverage maximum for this PhD plan: 10 credits. Courses are 3 credits each.</p><ul className="clean-list"><li>CS 5600 Computer Vision - 3 credits</li><li>CS 6010 Research Seminar - 1 credit</li><li>CS 6990 Dissertation Research - 3 credits</li><li>CS 5700 Natural Language Processing - 3 credits</li></ul><p>Total: <b>10 credits</b>. This is a potential fit to support a four-year PhD timeline; consider discussing it with your advisor.</p></section>; }
function Planner() { const { courses } = useApp(); const rec = courses.filter(c => ['CS 5600','CS 5700','CS 6010'].includes(c.code)); return <><PageTitle title="Course Planner" subtitle="Illustrative demo data. Recommendations are information for advising discussion." /><Roadmap /><section className="grid-2">{rec.map(c => <CourseCard c={c} key={c.code} why={`This course satisfies ${c.requirement} and aligns with preparation for research in ${c.researchRelevance.toLowerCase()}.`} />)}</section><Pathways /></>; }
function Pathways() { const { courses } = useApp(); return <section className="panel"><h2>Multiple Valid Pathways: Advanced Computing Elective</h2><ResponsiveTable headers={['Course','Potential fit','Research relevance','Career relevance','Workload','Assessment','Instructor','Quality indicator']} rows={courses.filter(c => c.requirement.includes('Elective')).map(c => [c.code, c.fit, c.researchRelevance, c.careerRelevance, c.workload, c.assessmentMethod, c.instructor, c.quality])} /></section>; }
function Milestones() { const { milestones } = useApp(); return <><PageTitle title="Milestone Tracker" /><div className="timeline">{milestones.map(m => <section className="panel milestone" key={m.name}><h2>{m.complete ? '✓' : '○'} {m.name}</h2><p><b>Status:</b> {m.status}</p><p><b>Target:</b> {m.target}</p><p>{m.description}</p><p><b>Recommended action:</b> {m.action}</p></section>)}</div></>; }
function Health() { const rows = [['Degree Progress','Good','Course and research credits are on pace.'],['GPA','Good','Current GPA is above the 3.00 requirement.'],['Assistantship Eligibility','Good','Enrollment plan meets full-time expectations.'],['Course Sequencing','Attention','Qualifying exam preparation course should be discussed.'],['Milestones','Attention','Committee formation is approaching.'],['Time-to-Degree','Good','Current roadmap supports the target window.'],['Graduation Readiness','Good','No blocking items in demo data.']]; return <><PageTitle title="Academic Health" /><section className="panel"><ResponsiveTable headers={['Area','Status','Explanation']} rows={rows.map(r => [r[0],<Status tone={r[1]==='Good'?'good':'warn'}>{r[1]}</Status>,r[2]])} /></section></>; }
function CourseExplorer() { const { courses } = useApp(); const [q,setQ]=useState(''); const [req,setReq]=useState('All'); const shown=courses.filter(c=>(req==='All'||c.requirement===req)&&`${c.code} ${c.title} ${c.instructor} ${c.assessmentMethod} ${c.researchRelevance} ${c.careerRelevance}`.toLowerCase().includes(q.toLowerCase())); return <><PageTitle title="Course Explorer" /><section className="panel filters"><input aria-label="Search courses" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search courses" /><select value={req} onChange={e=>setReq(e.target.value)}><option>All</option>{[...new Set(courses.map(c=>c.requirement))].map(r=><option key={r}>{r}</option>)}</select></section><div className="grid-2">{shown.length ? shown.map(c=><CourseCard c={c} key={c.code} />) : <p>No courses found.</p>}</div></>; }
function CourseCard({ c, why }) { return <article className="panel course-card"><h2>{c.code} - {c.title}</h2><p>{c.description}</p><dl><dt>Credits</dt><dd>{c.credits}</dd><dt>Prerequisites</dt><dd>{c.prerequisites}</dd><dt>Instructor</dt><dd>{c.instructor}</dd><dt>Assessment</dt><dd>{c.assessmentMethod}; {c.examFormat}</dd><dt>Grading</dt><dd>{c.grading}</dd><dt>Workload</dt><dd>{c.workload}</dd><dt>Related requirement</dt><dd>{c.requirement}</dd></dl>{why && <p className="why"><b>Why this course was recommended:</b> {why}</p>}</article>; }
function Transparency() { return <><PageTitle title="Advisor Transparency" /><section className="panel"><p>The platform does not replace faculty advising. It provides students with transparent information about other valid academic pathways so that students can have better-informed conversations with their advisors.</p><h2>Comparison Example</h2><ResponsiveTable headers={['Option','Requirement','Prerequisites','Research relevance','Career relevance','Assessment','Workload','Review status']} rows={[['Advisor recommendation: CS 5500','Advanced Computing Elective','CS 5100','Strong alignment','Research-oriented','Written exam + project','High','Reviewed Spring 2026'],['CS 5600 Computer Vision','Advanced Computing Elective','CS 5100','Strong alignment','Industry-oriented','Project + presentation','Moderate','Reviewed Spring 2026'],['CS 5700 NLP','Advanced Computing Elective','CS 5100','Research-oriented','Strong alignment','Mixed','Moderate','Reviewed Fall 2025']]} /></section></>; }
function Announcements() { const { announcements }=useApp(); return <><PageTitle title="Announcements" /><div className="stack">{announcements.map(a=><article className="panel" key={a.title}><h2>{a.title}</h2><p>{a.body}</p></article>)}</div></>; }

function AdminDashboard() { const { programs,courses,faculty,updates }=useApp(); return <><PageTitle title="University Administration" subtitle="Missouri Tech University demo data" /><div className="cards"><Card title="Programs" value={programs.length}/><Card title="Courses" value={courses.length}/><Card title="Faculty" value={faculty.length}/><Card title="Pending Updates" value="4"/></div><Updates /></>; }
function AdminCourses() { const { courses, saveCourses }=useApp(); const [editing,setEditing]=useState(null); const [draft,setDraft]=useState({}); const save=()=>{saveCourses(courses.map(c=>c.code===editing?draft:c)); setEditing(null);}; return <><PageTitle title="Course Management" /><div className="stack">{courses.map(c=><section className="panel" key={c.code}>{editing===c.code ? <EditCourse draft={draft} setDraft={setDraft} save={save} cancel={()=>setEditing(null)} /> : <><h2>{c.code} - {c.title}</h2><p>{c.description}</p><p><b>Instructor:</b> {c.instructor} | <b>Assessment:</b> {c.assessmentMethod} | <b>Workload:</b> {c.workload}</p><button onClick={()=>{setEditing(c.code);setDraft(c);}}>Edit</button></>}</section>)}</div></>; }
function EditCourse({draft,setDraft,save,cancel}) { const fields=['code','title','department','credits','description','prerequisites','instructor','requirement','assessmentMethod','examFormat','grading','workload','researchRelevance','careerRelevance']; return <div className="form-grid">{fields.map(f=><label key={f}>{f}<input value={draft[f] ?? ''} onChange={e=>setDraft({...draft,[f]:e.target.value})}/></label>)}<button className="primary" onClick={save}>Save</button><button onClick={cancel}>Cancel</button><p className="muted">Information updated successfully after saving.</p></div>; }
function AdminFaculty() { const { faculty, saveFaculty }=useApp(); const empty={name:'',department:'Computer Science',specialization:'',courses:'',load:'Low',availability:'Available',status:'Active'}; const [draft,setDraft]=useState(empty); const add=()=>{saveFaculty([...faculty,{...draft,courses:String(draft.courses).split(',').map(s=>s.trim())}]);setDraft(empty);}; return <><PageTitle title="Faculty Management" /><section className="panel"><ResponsiveTable headers={['Name','Department','Specialization','Courses','Teaching load','Availability','Status']} rows={faculty.map(f=>[f.name,f.department,f.specialization,Array.isArray(f.courses)?f.courses.join(', '):f.courses,f.load,f.availability,f.status])}/></section><section className="panel form-grid"><h2>Add Fictional Faculty</h2>{Object.keys(empty).map(k=><label key={k}>{k}<input value={draft[k]} onChange={e=>setDraft({...draft,[k]:e.target.value})}/></label>)}<button className="primary" onClick={add}>Add Faculty</button></section></>; }
function AdminRequirements() { const { requirements, saveRequirements }=useApp(); const [draft,setDraft]=useState(requirements); const update=(i,k,v)=>setDraft(draft.map((r,idx)=>idx===i?{...r,[k]:k==='name'||k==='status'?v:Number(v)}:r)); return <><PageTitle title="Degree Requirements" subtitle="PhD Computer Science: 80 credits, including 3 seminar credits and 40 research/dissertation credits."/><section className="panel">{draft.map((r,i)=><div className="require-edit" key={r.name}><input value={r.name} onChange={e=>update(i,'name',e.target.value)}/><input type="number" value={r.required} onChange={e=>update(i,'required',e.target.value)}/><input type="number" value={r.completed} onChange={e=>update(i,'completed',e.target.value)}/><select value={r.status} onChange={e=>update(i,'status',e.target.value)}><option>Completed</option><option>In Progress</option><option>Remaining</option></select></div>)}<button className="primary" onClick={()=>saveRequirements(draft)}>Save Requirements</button><p>GPA requirement: 3.00. Maximum time to degree: 8 years. Students may graduate after meeting or exceeding total requirements.</p></section></>; }
function SimpleAdminPage({ title }) { const data=useApp(); return <><PageTitle title={title}/><section className="panel"><p>This prototype view uses fictional Missouri Tech University and North Valley University data.</p><Updates /></section></>; }

function RegistrarOverview() { return <><PageTitle title="Dean / Registrar Portal" /><div className="cards"><Card title="Courses Reviewed" value="18"/><Card title="Assessment Items" value="31"/><Card title="Faculty Assignments" value="12"/><Card title="Curriculum Status" value="Current"/></div><Updates /></>; }
function AssessmentReview() { const { courses }=useApp(); return <><PageTitle title="Assessment Transparency" /><section className="panel"><ResponsiveTable headers={['Course','Faculty','Enrollment','Assessment','Exam','Grading','Rubric','Outcomes']} rows={courses.map(c=>[`${c.code} ${c.title}`,c.instructor,c.enrollment,c.assessmentMethod,c.examFormat,c.grading,'Available','Aligned with current curriculum outcomes'])}/></section></>; }
function FacultyAssignment() { const { courses, faculty }=useApp(); const [course,setCourse]=useState(courses[0].code); const selected=courses.find(c=>c.code===course)||courses[0]; const appropriate=faculty.filter(f=>f.department===selected.department && (f.availability==='Available'||f.specialization.includes('Machine Learning'))); return <><PageTitle title="Faculty Assignment" subtitle="Assign suitable faculty for exam creation, evaluation, and moderation." /><section className="panel form-grid"><label>Selected course<select value={course} onChange={e=>setCourse(e.target.value)}>{courses.map(c=><option key={c.code} value={c.code}>{c.code} - {c.title}</option>)}</select></label>{['Primary Instructor','Alternate Faculty for Exam/Paper Creation','Faculty Responsible for Evaluation','Faculty Overseer / Moderator'].map(label=><label key={label}>{label}<select>{appropriate.map(f=><option key={f.name}>{f.name}</option>)}</select></label>)}</section><section className="panel"><h2>Appropriate Faculty</h2><ResponsiveTable headers={['Faculty','Expertise','Availability','Current workload','Conflict']} rows={appropriate.map(f=>[f.name,f.specialization,f.availability,f.load,f.conflict])}/></section></>; }
function RegistrarCourses() { const { courses }=useApp(); return <><PageTitle title="Dean Course Review"/><section className="panel"><ResponsiveTable headers={['Course','Faculty','Enrollment','Assessment format','Grading criteria','Exam format','Curriculum status']} rows={courses.map(c=>[`${c.code} ${c.title}`,c.instructor,c.enrollment,c.assessmentMethod,c.grading,c.examFormat,c.curriculumStatus])}/></section></>; }
function MaintenanceOverview() { return <><PageTitle title="IT / Maintenance Portal" /><div className="cards"><Card title="System Status" value="Operational"/><Card title="Database" value="Demo Data"/><Card title="Authentication" value="Demo Mode"/><Card title="Last Backup" value="Today"/><Card title="Active Institutions" value="2"/><Card title="Users" value="24"/></div><SystemLogs /></>; }
function SystemLogs() { const { logs }=useApp(); return <section className="panel"><h2>System Activity Log</h2>{logs.map(l=><p className="update" key={l}>{l}</p>)}</section>; }

function ResponsiveTable({ headers, rows }) { return <div className="table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.length ? rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}>{c}</td>)}</tr>) : <tr><td colSpan={headers.length}>No data available.</td></tr>}</tbody></table></div>; }

function StudentRoutes() { return <Layout nav={studentNav} title="Student Portal"><Routes><Route index element={<StudentDashboard/>}/><Route path="profile" element={<Profile/>}/><Route path="record" element={<AcademicRecord/>}/><Route path="progress" element={<DegreeProgress/>}/><Route path="planner" element={<Planner/>}/><Route path="milestones" element={<Milestones/>}/><Route path="health" element={<Health/>}/><Route path="courses" element={<CourseExplorer/>}/><Route path="transparency" element={<Transparency/>}/><Route path="announcements" element={<Announcements/>}/></Routes></Layout>; }
function AdminRoutes() { return <Layout nav={adminNav} title="Administration"><Routes><Route index element={<AdminDashboard/>}/><Route path="courses" element={<AdminCourses/>}/><Route path="faculty" element={<AdminFaculty/>}/><Route path="requirements" element={<AdminRequirements/>}/>{['info','colleges','departments','programs','milestones','announcements','documents','history'].map(p=><Route key={p} path={p} element={<SimpleAdminPage title={p.replace(/^\w/,c=>c.toUpperCase())}/>}/>)}</Routes></Layout>; }
function RegistrarRoutes() { return <Layout nav={registrarNav} title="Dean / Registrar"><Routes><Route index element={<RegistrarOverview/>}/><Route path="courses" element={<RegistrarCourses/>}/><Route path="assessment" element={<AssessmentReview/>}/><Route path="assignment" element={<FacultyAssignment/>}/>{['faculty','curriculum','audit'].map(p=><Route key={p} path={p} element={<SimpleAdminPage title={p.replace(/^\w/,c=>c.toUpperCase())}/>}/>)}</Routes></Layout>; }
function MaintenanceRoutes() { return <Layout nav={itNav} title="Maintenance"><Routes><Route index element={<MaintenanceOverview/>}/>{['users','institutions','logs','backups','notifications','config'].map(p=><Route key={p} path={p} element={p==='logs'?<SystemLogs/>:<SimpleAdminPage title={p.replace(/^\w/,c=>c.toUpperCase())}/>}/>)}</Routes></Layout>; }

function App() {
  return <AppProvider><HashRouter><Routes><Route path="/" element={<Landing/>}/><Route path="/login" element={<Login/>}/><Route path="/student/*" element={<StudentRoutes/>}/><Route path="/admin/*" element={<AdminRoutes/>}/><Route path="/registrar/*" element={<RegistrarRoutes/>}/><Route path="/maintenance/*" element={<MaintenanceRoutes/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></HashRouter></AppProvider>;
}

createRoot(document.getElementById('root')).render(<App />);
