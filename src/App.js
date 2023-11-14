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
  { id: 'qmml', name: 'QMM-L' },
  { id: 'ctg', name: 'CTG' },
  { id: 'hrl', name: 'HRL' },
  { id: 'log', name: 'LOG' },
  { id: 'fcm', name: 'FCM' },
];

const projects = {
  pm:  ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  pc:  ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  mse: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  tef: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  qmm: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  qmml: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  ctg: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  hrl: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  log: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
  fcm: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14', 'Project 15'],
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

const initialNotes = {
  pm: {
    'Project 1': 'Notes Project 1 PM',
    'Project 2': 'Notes Project 2 PM',
    'Project 3': 'Notes Project 3 PM',
    'Project 4': 'Notes Project 4 PM',
    'Project 5': 'Notes Project 5 PM',
    'Project 6': 'Notes Project 6 PM',
    'Project 7': 'Notes Project 7 PM',
    'Project 8': 'Notes Project 8 PM',
    'Project 9': 'Notes Project 9 PM',
    'Project 10': 'Notes Project 10 PM',
    'Project 11': 'Notes Project 11 PM',
    'Project 12': 'Notes Project 12 PM',
    'Project 13': 'Notes Project 13 PM',
    'Project 14': 'Notes Project 14 PM',
    'Project 15': 'Notes Project 15 PM',
  },
  pc: {
    'Project 1': 'Notes Project 1 PC',
    'Project 2': 'Notes Project 2 PC',
    'Project 3': 'Notes Project 3 PC',
    'Project 4': 'Notes Project 4 PC',
    'Project 5': 'Notes Project 5 PC',
    'Project 6': 'Notes Project 6 PC',
    'Project 7': 'Notes Project 7 PC',
    'Project 8': 'Notes Project 8 PC',
    'Project 9': 'Notes Project 9 PC',
    'Project 10': 'Notes Project 10 PC',
    'Project 11': 'Notes Project 11 PC',
    'Project 12': 'Notes Project 12 PC',
    'Project 13': 'Notes Project 13 PC',
    'Project 14': 'Notes Project 14 PC',
    'Project 15': 'Notes Project 15 PC',
  },

  mse: {
    'Project 1': 'Notes Project 1 MSE',
    'Project 2': 'Notes Project 2 MSE',
    'Project 3': 'Notes Project 3 MSE',
    'Project 4': 'Notes Project 4 MSE',
    'Project 5': 'Notes Project 5 MSE',
    'Project 6': 'Notes Project 6 MSE',
    'Project 7': 'Notes Project 7 MSE',
    'Project 8': 'Notes Project 8 MSE',
    'Project 9': 'Notes Project 9 MSE',
    'Project 10': 'Notes Project 10 MSE',
    'Project 11': 'Notes Project 11 MSE',
    'Project 12': 'Notes Project 12 MSE',
    'Project 13': 'Notes Project 13 MSE',
    'Project 14': 'Notes Project 14 MSE',
    'Project 15': 'Notes Project 15 MSE',
  },

  tef: {
    'Project 1': 'Notes Project 1 TEF',
    'Project 2': 'Notes Project 2 TEF',
    'Project 3': 'Notes Project 3 TEF',
    'Project 4': 'Notes Project 4 TEF',
    'Project 5': 'Notes Project 5 TEF',
    'Project 6': 'Notes Project 6 TEF',
    'Project 7': 'Notes Project 7 TEF',
    'Project 8': 'Notes Project 8 TEF',
    'Project 9': 'Notes Project 9 TEF',
    'Project 10': 'Notes Project 10 TEF',
    'Project 11': 'Notes Project 11 TEF',
    'Project 12': 'Notes Project 12 TEF',
    'Project 13': 'Notes Project 13 TEF',
    'Project 14': 'Notes Project 14 TEF',
    'Project 15': 'Notes Project 15 TEF',
  },

  qmm: {
    'Project 1': 'Notes Project 1 QMM',
    'Project 2': 'Notes Project 2 QMM',
    'Project 3': 'Notes Project 3 QMM',
    'Project 4': 'Notes Project 4 QMM',
    'Project 5': 'Notes Project 5 QMM',
    'Project 6': 'Notes Project 6 QMM',
    'Project 7': 'Notes Project 7 QMM',
    'Project 8': 'Notes Project 8 QMM',
    'Project 9': 'Notes Project 9 QMM',
    'Project 10': 'Notes Project 10 QMM',
    'Project 11': 'Notes Project 11 QMM',
    'Project 12': 'Notes Project 12 QMM',
    'Project 13': 'Notes Project 13 QMM',
    'Project 14': 'Notes Project 14 QMM',
    'Project 15': 'Notes Project 15 QMM',
  },

  qmml: {
    'Project 1': 'Notes Project 1 QMM-L',
    'Project 2': 'Notes Project 2 QMM-L',
    'Project 3': 'Notes Project 3 QMM-L',
    'Project 4': 'Notes Project 4 QMM-L',
    'Project 5': 'Notes Project 5 QMM-L',
    'Project 6': 'Notes Project 6 QMM-L',
    'Project 7': 'Notes Project 7 QMM-L',
    'Project 8': 'Notes Project 8 QMM-L',
    'Project 9': 'Notes Project 9 QMM-L',
    'Project 10': 'Notes Project 10 QMM-L',
    'Project 11': 'Notes Project 11 QMM-L',
    'Project 12': 'Notes Project 12 QMM-L',
    'Project 13': 'Notes Project 13 QMM-L',
    'Project 14': 'Notes Project 14 QMM-L',
    'Project 15': 'Notes Project 15 QMM-L',
  },

  ctg: {
    'Project 1': 'Notes Project 1 CTG',
    'Project 2': 'Notes Project 2 CTG',
    'Project 3': 'Notes Project 3 CTG',
    'Project 4': 'Notes Project 4 CTG',
    'Project 5': 'Notes Project 5 CTG',
    'Project 6': 'Notes Project 6 CTG',
    'Project 7': 'Notes Project 7 CTG',
    'Project 8': 'Notes Project 8 CTG',
    'Project 9': 'Notes Project 9 CTG',
    'Project 10': 'Notes Project 10 CTG',
    'Project 11': 'Notes Project 11 CTG',
    'Project 12': 'Notes Project 12 CTG',
    'Project 13': 'Notes Project 13 CTG',
    'Project 14': 'Notes Project 14 CTG',
    'Project 15': 'Notes Project 15 CTG',
  },

  hrl: {
    'Project 1': 'Notes Project 1 HRL',
    'Project 2': 'Notes Project 2 HRL',
    'Project 3': 'Notes Project 3 HRL',
    'Project 4': 'Notes Project 4 HRL',
    'Project 5': 'Notes Project 5 HRL',
    'Project 6': 'Notes Project 6 HRL',
    'Project 7': 'Notes Project 7 HRL',
    'Project 8': 'Notes Project 8 HRL',
    'Project 9': 'Notes Project 9 HRL',
    'Project 10': 'Notes Project 10 HRL',
    'Project 11': 'Notes Project 11 HRL',
    'Project 12': 'Notes Project 12 HRL',
    'Project 13': 'Notes Project 13 HRL',
    'Project 14': 'Notes Project 14 HRL',
    'Project 15': 'Notes Project 15 HRL',

    log: {
      'Project 1': 'Notes Project 1 LOG',
      'Project 2': 'Notes Project 2 LOG',
      'Project 3': 'Notes Project 3 LOG',
      'Project 4': 'Notes Project 4 LOG',
      'Project 5': 'Notes Project 5 LOG',
      'Project 6': 'Notes Project 6 LOG',
      'Project 7': 'Notes Project 7 LOG',
      'Project 8': 'Notes Project 8 LOG',
      'Project 9': 'Notes Project 9 LOG',
      'Project 10': 'Notes Project 10 LOG',
      'Project 11': 'Notes Project 11 LOG',
      'Project 12': 'Notes Project 12 LOG',
      'Project 13': 'Notes Project 13 LOG',
      'Project 14': 'Notes Project 14 LOG',
      'Project 15': 'Notes Project 15 LOG',
    },
  
    fcm: {
      'Project 1': 'Notes Project 1 FCM',
      'Project 2': 'Notes Project 2 FCM',
      'Project 3': 'Notes Project 3 FCM',
      'Project 4': 'Notes Project 4 FCM',
      'Project 5': 'Notes Project 5 FCM',
      'Project 6': 'Notes Project 6 FCM',
      'Project 7': 'Notes Project 7 FCM',
      'Project 8': 'Notes Project 8 FCM',
      'Project 9': 'Notes Project 9 FCM',
      'Project 10': 'Notes Project 10 FCM',
      'Project 11': 'Notes Project 11 FCM',
      'Project 12': 'Notes Project 12 FCM',
      'Project 13': 'Notes Project 13 FCM',
      'Project 14': 'Notes Project 14 FCM',
      'Project 15': 'Notes Project 15 FCM',
    },
  },
}

const departmentCriteria = {
  'pm': ["PS Method", "Presentation Skills"],
  'pc': ["Cost Savings", "Involvement of Associates"],
  'mse': ["PS Method", "Cost Savings"],
  'tef': ["KPI Improvement", "Presentation Skills"],
  'qmm': ["PS Method", "Involvement of Associates"],
  'qmml': ["PS Method", "Involvement of Associates"],
  'ctg': ["KPI Improvement", "Cost Savings"],
  'hrl': ["Presentation Skills", "Involvement of Associates"],
  'log': ["KPI Improvement", "Cost Savings"],
  'fcm': ["Cost Savings", "Presentation Skills"]
};

function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [notes, setNotes] = useState(initialNotes);


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
  
    // Adăugăm 'projectNumber' ca al doilea parametru aici
    const calculateDataForProject = (ratings, projectNumber) => {
      const psMethodAverage = (ratings['category1'] + ratings['category2'] + ratings['category3'] + ratings['category4'] + ratings['category5']);
      const kpiImprovementAverage = (ratings["kpi-improvement-category1"] + ratings["kpi-improvement-category2"]);
      const costSavingsImprovementAverage = (ratings["cost-savings-improvement-category1"] + ratings["cost-savings-improvement-category2"] + ratings["cost-savings-improvement-category3"]);
      const presentationSkillsAverage = (ratings["presentation-skills-category1"] + ratings["presentation-skills-category2"] + ratings["presentation-skills-category3"]);
      const involvementAssociatesAverage = (ratings["involvement-of-associates-category1"] + ratings["involvement-of-associates-category2"] + ratings["involvement-of-associates-category3"]);
  
      // Obținem notele pentru proiectul curent bazat pe 'projectNumber'
      const projectNotes = notes[selectedDepartment]?.[`Project ${projectNumber}`] || ''; 
  
      return {
        "PS Method": psMethodAverage,
        "KPI Improvement": kpiImprovementAverage,
        "Cost Savings Improvement": costSavingsImprovementAverage,
        "Presentation Skills": presentationSkillsAverage,
        "Involvement of Associates from Affected Area": involvementAssociatesAverage,
        Notes: projectNotes,
      };
    };
  
    const getURLForProject = (sheetId, projectNumber, rowToUpdate) => {
      return `https://sheet.best/api/sheets/${sheetId}/tabs/Project ${projectNumber}/${rowToUpdate}`;
    }
  
    const sheetId = "1fbc3fd8-0afd-4a5b-a2e9-7abc715ba428";
    const departmentIndex = departments.findIndex(dept => dept.id === selectedDepartment);
    const rowToUpdate = departmentIndex !== -1 ? departmentIndex : 0;
  
    const promises = [];
  
    for(let i = 1; i <= 15; i++) {
      const currentProjectRatings = projectRatings[`Project ${i}`];
      if(!currentProjectRatings) {
        console.warn(`Nu există ratinguri pentru Proiectul ${i}`);
        continue;
      }
  
      // Pasăm 'i' ca 'projectNumber' către 'calculateDataForProject'
      const data = calculateDataForProject(currentProjectRatings, i);
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
            <div>
            <label>Notes:</label>
            <div>
    <textarea
      id="notes"
      className="note-size"
      value={notes[selectedDepartment]?.[selectedProject] || ''}
      onChange={(e) => {
        const updatedNotes = { ...notes };
        if (!updatedNotes[selectedDepartment]) {
          updatedNotes[selectedDepartment] = {};
        }
        updatedNotes[selectedDepartment][selectedProject] = e.target.value;
        setNotes(updatedNotes);
      }}
      placeholder="Add your notes here..."
    /><br />
  </div></div></div>
      <div>
          <label><i>*Please select a mark for each project from below</i></label>
          <br />
          <br />
          <label>Projects with marks between 1 and 5: 1 Very Poor and 5 Very Good</label>
          <br />
          <br />
          <label>Projects with marks between 1 and 3: 1 Very Poor and 3 Very Good</label>
    
          </div>
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
