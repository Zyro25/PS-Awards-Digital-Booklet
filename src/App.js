import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useMemo } from 'react';
const departments = [
  { id: 'pm' , name: 'PM'  },
  { id: 'pc' , name: 'PC'  },
  { id: 'mse', name: 'MSE' },
  { id: 'tef', name: 'TEF' },
  { id: 'qmm', name: 'QMM' },
  { id: 'pse', name: 'PSE' },
  { id: 'ctg', name: 'CTG' },
  { id: 'hrl', name: 'HRL' },
  { id: 'log', name: 'LOG' },
];

const projects = {
  pm:  ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  pc:  ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  mse: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  tef: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  qmm: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  pse: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  ctg: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  hrl: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  log: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
};

const defineProjects ={

    'Project 1': 'Set Project Name 1',
    'Project 2': 'Set Project Name 2',
    'Project 3': 'Set Project Name 3',
    'Project 4': 'Set Project Name 4',
    'Project 5': 'Set Project Name 5',
    'Project 6': 'Set Project Name 6',
    'Project 7': 'Set Project Name 7',
    'Project 8': 'Set Project Name 8',
    'Project 9': 'Set Project Name 9',
    'Project 10': 'Set Project Name 10',
    'Project 11': 'Set Project Name 11',
    'Project 12': 'Set Project Name 12',
    'Project 13': 'Set Project Name 13',
    'Project 14': 'Set Project Name 14',
    'Project 15': 'Set Project Name 15',
    
};

const defineProjectLeader = {
    'Project 1': 'Project Leader A',
    'Project 2': 'Project Leader B',
    'Project 3': 'Project Leader C',
    'Project 4': 'Project Leader D',
    'Project 5': 'Project Leader E',
    'Project 6': 'Project Leader F',
    'Project 7': 'Project Leader G',
    'Project 8': 'Project Leader H',
    'Project 9': 'Project Leader I',
    'Project 10': 'Project Leader J',
    'Project 11': 'Project Leader K',
    'Project 12': 'Project Leader L',
    'Project 13': 'Project Leader M',
    'Project 14': 'Project Leader N',
    'Project 15': 'Project Leader O',
}
const departmentCriteria = {
  'pm': ["PS Method", "Presentation Skills"],
  'pc': ["Cost Savings", "Involvement of Associates"],
  'mse': ["PS Method", "KPI Improvement"],
  'tef': ["KPI Improvement", "Presentation Skills"],
  'qmm': ["PS Method", "Involvement of Associates"],
  'pse': ["PS Method", "Involvement of Associates"],
  'ctg': ["KPI Improvement", "Cost Savings"],
  'hrl': ["Presentation Skills", "Involvement of Associates"],
  'log': ["KPI Improvement", "Cost Savings"],
};

function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [notes, setNotes] = useState('');


  // Stare pentru rating-urile pentru fiecare categorie pentru fiecare proiect
  const [projectRatings, setProjectRatings] = useState({});
  useEffect(() => {
    // La schimbarea proiectului, verificați dacă există rating-uri pentru proiectul selectat
    if (selectedProject) {
      if (!projectRatings[selectedProject]) {
        // Dacă nu există rating-uri pentru proiectul selectat, inițializați-le cu rating-uri goale
        setProjectRatings((prevRatings) => ({
          ...prevRatings,
          [selectedProject]: {
            category1: 0,
            category2: 0,
            category3: 0,
            category4: 0,
            category5: 0,
            'cost-savings-improvement-category1': 0,
            'cost-savings-improvement-category2': 0,
            'cost-savings-improvement-category3': 0,
            'presentation-skills-category1': 0,
            'presentation-skills-category2': 0,
            'presentation-skills-category3': 0,
            'involvement-of-associates-category1': 0,
            'involvement-of-associates-category2': 0,
            'involvement-of-associates-category3': 0,
          },
        }));
      }
    }
  }, [selectedProject, projectRatings]); // Adăugați projectRatings ca o dependență aici

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedProject('');
    setNotes('');
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleRatingChange = (project, category, rating) => {
    // Actualizați rating-urile pentru proiectul și categoria selectate
    setProjectRatings((prevRatings) => ({
      ...prevRatings,
      [project]: {
        ...prevRatings[project],
        [category]: rating,
      },
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const calculateDataForProject = (ratings) => {
        const psMethodAverage = ( (ratings['category1'] * 0.2) + (ratings['category2'] * 0.2) + (ratings['category3'] * 0.2) + (ratings['category4'] * 0.2) + (ratings['category5'] * 0.2));
        const kpiImprovementAverage = (ratings["kpi-improvement-category1"] * 0.5 + ratings["kpi-improvement-category2"] * 0.5) / 1;
        const costSavingsImprovementAverage = (ratings["cost-savings-improvement-category1"] * 0.4 + ratings["cost-savings-improvement-category2"] * 0.3 + ratings["cost-savings-improvement-category3"] * 0.3) / (0.4 + 0.3 + 0.3);
        const presentationSkillsAverage = (ratings["presentation-skills-category1"] * 0.4 + ratings["presentation-skills-category2"] * 0.3 + ratings["presentation-skills-category3"] * 0.3) / (0.4 + 0.3 + 0.3);
        const involvementAssociatesAverage = (ratings["involvement-of-associates-category1"] * 0.3 + ratings["involvement-of-associates-category2"] * 0.3 + ratings["involvement-of-associates-category3"] * 0.4) / (0.3 + 0.3 + 0.4);

        return {
            "PS Method": psMethodAverage,
            "KPI Improvement": kpiImprovementAverage,
            "Cost Savings Improvement": costSavingsImprovementAverage,
            "Presentation Skills": presentationSkillsAverage,
            "Involvement of Associates from Affected Area": involvementAssociatesAverage,
            Notes: notes,
        };
    };

    const getURLForProject = (sheetId, projectNumber, rowToUpdate) => {
        return `https://sheet.best/api/sheets/${sheetId}/tabs/Project ${projectNumber}/${rowToUpdate}`;
    }

    const sheetId = "3048251d-1474-4596-8449-f3ea8ead9356";
    const departmentIndex = departments.findIndex(dept => dept.id === selectedDepartment);
    const rowToUpdate = departmentIndex !== -1 ? departmentIndex : 0;

    const promises = [];
  
    for(let i = 1; i <= 15; i++) {
        const currentProjectRatings = projectRatings[`Project ${i}`];
        if(!currentProjectRatings) {
            console.warn(`Nu există ratinguri pentru Proiectul ${i}`);
            continue;
        }

        const data = calculateDataForProject(currentProjectRatings);
        const url = getURLForProject(sheetId, i, rowToUpdate);
        promises.push(axios.patch(url, data));
    }

    Promise.all(promises)
        .then(responses => {
            console.log('Toate datele au fost trimise cu succes');
            setNotes('');
            setLoading(false);
            setProgress(0);
            // Afișați un mesaj către utilizator pentru succes
            alert('Data was succesfully send!Thank you!');
            // Resetați și rating-urile pentru toate proiectele
            setProjectRatings({
                'Project 1': resetRatings(),
                'Project 2': resetRatings(),
                'Project 3': resetRatings(),
                'Project 4': resetRatings(),
                'Project 5': resetRatings(),
                'Project 6': resetRatings(),
                'Project 7': resetRatings(),
                'Project 8': resetRatings(),
                'Project 9': resetRatings(),
                'Project 10': resetRatings(),
                'Project 11': resetRatings(),
                'Project 12': resetRatings(),
                'Project 13': resetRatings(),
                'Project 14': resetRatings(),
                'Project 15': resetRatings(),
            });
        })
        .catch(error => {
            console.error('A apărut o eroare la trimiterea datelor:', error);
            if (error.response) {
                console.error('Răspuns de la server:', error.response.data);
            }
            setLoading(false);//Dezactiveaza starea de incarcare in caz de eroare
            setProgress(0); //Resetati progresul la 0
        });
}

const resetRatings = () => {
    return {
        category1: 0,
        category2: 0,
        category3: 0,
        category4: 0,
        category5: 0,
        'cost-savings-improvement-category1': 0,
        'cost-savings-improvement-category2': 0,
        'cost-savings-improvement-category3': 0,
        'presentation-skills-category1': 0,
        'presentation-skills-category2': 0,
        'presentation-skills-category3': 0,
        'involvement-of-associates-category1': 0,
        'involvement-of-associates-category2': 0,
        'involvement-of-associates-category3': 0,
    };
}

//<-----------------------------------------Export Data-------------------------------------------->
const renderRatings = (project, category, maxRating) => {
  const ratingsArray = Array.from({ length: maxRating }, (_, i) => i + 1);

  // Pentru a actualiza un rating specific
  const handleSingleRatingChange = (project, category, rating) => {
    // Setează ratingul pentru categoria specificată
    handleRatingChange(project, category, rating);
  };

  return (
    <div className="ratings">
      {ratingsArray.map((rating, index) => (
        <div
          key={rating}
          className={`rating-option ${
            projectRatings[project]?.[category] === rating ? 'selected' : ''
          }`}
          onClick={() => handleSingleRatingChange(selectedProject, category, rating)}
        >
          {rating}
        </div>
      ))}
    </div>
  );
};


// const isFormValid = (selectedDepartment, projectRatings, selectedProject) => {
//   const criteria = departmentCriteria[selectedDepartment];
//   if (!criteria) {
//     throw new Error(`No criteria found for department: ${selectedDepartment}`);
//   }
//   for (const criterion of criteria) {
//     if (!projectRatings[selectedProject]?.[criterion]) {
//       return false; // If there's no rating for a criterion, return false
//     }
//   }
//   return true; // If all criteria have ratings, return true
// };


const criteriaToSubcategories = useMemo(() => ({
  "PS Method": ['category1', 'category2', 'category3', 'category4', 'category5'],
  "Presentation Skills": ['presentation-skills-category1', 'presentation-skills-category2', 'presentation-skills-category3'],
  "Involvement of Associates": ['involvement-of-associates-category1', 'involvement-of-associates-category2', 'involvement-of-associates-category3'],
  "Cost Savings" : ['cost-savings-improvement-category1','cost-savings-improvement-category2','cost-savings-improvement-category3']
}), []); // array-ul gol indică faptul că useMemo nu are dependențe și, astfel, valoarea va fi memoizată și nu se va schimba între randări

const [formIsValid, setFormIsValid] = useState(false);

// Pentru inițializarea ratingurilor
useEffect(() => {
  if (selectedProject && !projectRatings[selectedProject]) {
    const relevantSubcategories = departmentCriteria[selectedDepartment].flatMap(criteria => criteriaToSubcategories[criteria] || []);
    const initialRatings = {};
    for (const subcategory of relevantSubcategories) {
      initialRatings[subcategory] = 0;
    }
    setProjectRatings((prevRatings) => ({
      ...prevRatings,
      [selectedProject]: initialRatings,
    }));
  }
}, [selectedProject, selectedDepartment, projectRatings, criteriaToSubcategories]);

// Pentru validarea formularului
useEffect(() => {
  if (!selectedDepartment || !projects[selectedDepartment]) return; // Ieșiți din efect dacă departamentul selectat nu este valid
  
  const allProjectsForDepartment = projects[selectedDepartment];
  
  const allProjectsRated = allProjectsForDepartment.every(project => {
    const ratingsForProject = projectRatings[project] || {};
    const relevantSubcategories = departmentCriteria[selectedDepartment].flatMap(criteria => criteriaToSubcategories[criteria] || []);
    return relevantSubcategories.every(subcategory => ratingsForProject[subcategory] && ratingsForProject[subcategory] !== 0);
  });
  
  setFormIsValid(allProjectsRated);
}, [projectRatings, selectedDepartment, criteriaToSubcategories]);

  return (
    <div className="App">
      {/* Afișați fereastra de încărcare și progresul doar atunci când "loading" este true */}
    {loading && (
      <div className="loader-container">
        <div className="loader"></div>
        <div className="progress">{progress}%</div>
      </div>
    )}
      <h1>PS Awards Digital Booklet</h1>
      <form className="dropdown" onSubmit={handleSubmit} >
      <div>
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="dropdown-button"
        >
          <option value="">Select department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      {selectedDepartment && (
        <div className="dropdown">
          <select
            value={selectedProject}
            onChange={handleProjectChange}
            className="dropdown-button"
          >
            <option value="">Select project</option>
            {projects[selectedDepartment].map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedProject && (
        <div className="form">
          <div className="form-row">
            <label>{selectedProject ? `${selectedProject}` : 'Nume:'}</label>
            <label>{defineProjects[selectedProject]}</label>
          </div>
          <div className="form-row">
            <label>Team Leader:</label>
            <label>{defineProjectLeader[selectedProject]}</label>
          </div>
            <label>Notes:</label>
            <textarea className="note-size"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes here..."
            />
          <label><i>*Please select a mark for each project from below</i></label>

          {selectedDepartment && departmentCriteria[selectedDepartment].includes("PS Method") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">
              PS method
              </label>
            </div>
            <label className="text-left">
              1. Facts collection done properly (no ambiguities, no assumption,
              precise information and facts, no conclusions)
            </label>
            {renderRatings(selectedProject, 'category1', 5)}
            <label className="text-left">
              2. Cause-effect relation understood (fundamental consideration, 5-why)
            </label>
            {renderRatings(selectedProject, 'category2', 5) }
            <label className="text-left">3. TRC & MRC clearly defined</label>
            {renderRatings(selectedProject, 'category3', 5)}
            <label className="text-left">
              4. Corrective & preventive measures defined acc. to TRC & MRC
            </label>
            {renderRatings(selectedProject, 'category4', 5)}
            <label className="text-left">5. Lessons Learned worked out</label>
            {renderRatings(selectedProject, 'category5', 5)}
          </div>)}

          {selectedDepartment && departmentCriteria[selectedDepartment].includes("KPI Improvement") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">KPI Improvement</label>
            </div>
            <label className="text-left">
              1. Clear proof of improvement related to KPI, coherent data (KPI
              identified, valid measurement for the KPI in focus)
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category1', 5)}
            <label className="text-left">
              2. Sustainability of measures, long-term solutions (measures for TRC
              and MRC are implemented and effectiveness is proven)
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category2', 5)}
          </div>)}

          {selectedDepartment && departmentCriteria[selectedDepartment].includes("Cost Savings") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">Cost Savings Improvement</label>
            </div>
            <label className="text-left">
              1. Benefit evaluation of measures converted in money (cost saving or
              future projection savings)
            </label>
            {renderRatings(selectedProject, 'cost-savings-improvement-category1', 3)}
            <label className="text-left">
              2. Coherent and logical conversion of KPI to cost
            </label>
            {renderRatings(selectedProject, 'cost-savings-improvement-category2', 3)}
            <label className="text-left">
              3. Cost/benefit impact (e.g. investment vs. benefit, invested human
              resources, time involved)
            </label>
            {renderRatings(selectedProject, 'cost-savings-improvement-category3', 3)}
          </div>)}
          
          {selectedDepartment && departmentCriteria[selectedDepartment].includes("Presentation Skills") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">Presentation Skills</label>
            </div>
            <label className="text-left">
              1. Communication effectiveness, body language, tone of voice
            </label>
            {renderRatings(selectedProject, 'presentation-skills-category1', 3)}
            <label className="text-left">
              2. Ability to synthesize information, clear conclusions
            </label>
            {renderRatings(selectedProject, 'presentation-skills-category2', 3)}
            <label className="text-left">3. Consistency of visuals</label>
            {renderRatings(selectedProject, 'presentation-skills-category3', 3)}
          </div>)}

          {selectedDepartment && departmentCriteria[selectedDepartment].includes("Involvement of Associates") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">
                Involvement of Associates from Affected Area
              </label>
            </div>
            <label className="text-left">1. Relevant functions involvement</label>
            {renderRatings(selectedProject, 'involvement-of-associates-category1', 3)}
            <label className="text-left">
              2. Team and resources management (e.g. milestones visible, regular
              reviews with stakeholders and sponsor available, action list derived
              from the meetings)
            </label>
            {renderRatings(selectedProject, 'involvement-of-associates-category2', 3)}
            <label className="text-left">
              3. Involvement of sponsor, regular reviews with sponsor support
              (proof required), case acknowledged and approved by the sponsor 
            </label>
            {renderRatings(selectedProject, 'involvement-of-associates-category3', 3)}
          </div>)}

          <button type="submit" className="submit-button" disabled={!formIsValid}>Submit</button>
        </div>
      )}</form>
    </div>
  );
}
export default App;
