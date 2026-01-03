// ===================================
// State Management
// ===================================
let subjectCount = 0;

// ===================================
// DOM Elements
// ===================================
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const subjectsContainer = document.getElementById('subjects-container');
const addSubjectBtn = document.getElementById('add-subject-btn');
const calculateBtn = document.getElementById('calculate-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsSection = document.getElementById('results-section');
const creditsResult = document.getElementById('credits-result');
const tgpaResult = document.getElementById('tgpa-result');
const percentageResult = document.getElementById('percentage-result');
const gradeResult = document.getElementById('grade-result');
const loadSubjectsBtn = document.getElementById('load-subjects-btn');

// ===================================
// LPU CSE Subject Database
// ===================================

const lpuSubjects = {
    1: [ // Semester 1
        { name: 'Orientation to Computing I', credits: 4 },
        { name: 'Python Programming', credits: 4 },
        { name: 'Engineering Mathematics I', credits: 4 },
        { name: 'Soft Skills', credits: 2 },
        { name: 'Basic Electrical & Electronics', credits: 3 },
        { name: 'Physics/Mechanical Engineering', credits: 3 },
        { name: 'Internet Programming Lab', credits: 1 }
    ],
    2: [ // Semester 2
        { name: 'Computer Programming (C/C++)', credits: 4 },
        { name: 'Database Management Systems', credits: 4 },
        { name: 'Discrete Mathematics', credits: 4 },
        { name: 'Software Engineering', credits: 3 },
        { name: 'Engineering Graphics & Digital Fabrication', credits: 2 },
        { name: 'Orientation to Computing II', credits: 3 },
        { name: 'Language Elective', credits: 2 }
    ],
    3: [ // Semester 3
        { name: 'Data Structures', credits: 4 },
        { name: 'Computer Organization & Architecture', credits: 4 },
        { name: 'Operating Systems', credits: 4 },
        { name: 'Engineering Mathematics II', credits: 4 },
        { name: 'Object Oriented Programming', credits: 3 },
        { name: 'Data Structures Lab', credits: 1 },
        { name: 'Professional Elective I', credits: 3 }
    ],
    4: [ // Semester 4
        { name: 'Design & Analysis of Algorithms', credits: 4 },
        { name: 'Computer Networks', credits: 4 },
        { name: 'Theory of Computation', credits: 4 },
        { name: 'Microprocessors & Microcontrollers', credits: 3 },
        { name: 'Web Technologies', credits: 3 },
        { name: 'Algorithms Lab', credits: 1 },
        { name: 'Professional Elective II', credits: 3 }
    ],
    5: [ // Semester 5
        { name: 'Compiler Design', credits: 4 },
        { name: 'Artificial Intelligence', credits: 4 },
        { name: 'Machine Learning', credits: 4 },
        { name: 'Information Security', credits: 3 },
        { name: 'Professional Elective III', credits: 3 },
        { name: 'AI/ML Lab', credits: 1 },
        { name: 'Open Elective I', credits: 3 }
    ],
    6: [ // Semester 6
        { name: 'Cloud Computing', credits: 4 },
        { name: 'Big Data Analytics', credits: 4 },
        { name: 'Mobile Application Development', credits: 3 },
        { name: 'Professional Elective IV', credits: 3 },
        { name: 'Professional Elective V', credits: 3 },
        { name: 'Project I', credits: 2 },
        { name: 'Open Elective II', credits: 3 }
    ],
    7: [ // Semester 7
        { name: 'Deep Learning', credits: 4 },
        { name: 'Internet of Things', credits: 3 },
        { name: 'Blockchain Technology', credits: 3 },
        { name: 'Professional Elective VI', credits: 3 },
        { name: 'Professional Elective VII', credits: 3 },
        { name: 'Project II', credits: 3 },
        { name: 'Open Elective III', credits: 3 }
    ],
    8: [ // Semester 8
        { name: 'DevOps & Cloud Native', credits: 3 },
        { name: 'Cyber Security', credits: 3 },
        { name: 'Professional Elective VIII', credits: 3 },
        { name: 'Professional Elective IX', credits: 3 },
        { name: 'Major Project', credits: 6 },
        { name: 'Industrial Training', credits: 2 }
    ]
};

// ===================================
// Theme Management
// ===================================

/**
 *Initialize theme from localStorage or default to dark mode
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
}

/**
 * Toggle between dark and light mode
 */
function toggleTheme() {
    const isLightMode = body.classList.contains('light-mode');

    if (isLightMode) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
}

// ===================================
// Subject Row Management
// ===================================

/**
 * Create a new subject input row with LPU structure
 * @param {number} index - The index for animation delay
 * @returns {HTMLElement} The created subject row element
 */
function createSubjectRow(index = subjectCount) {
    const row = document.createElement('div');
    row.classList.add('subject-row');
    row.style.animationDelay = `${index * 0.1}s`;

    const subjectInput = document.createElement('input');
    subjectInput.type = 'text';
    subjectInput.classList.add('input-field', 'subject-name');
    subjectInput.placeholder = 'Subject Name';
    subjectInput.setAttribute('aria-label', 'Subject name');

    const creditsInput = document.createElement('input');
    creditsInput.type = 'number';
    creditsInput.classList.add('input-field', 'subject-credits');
    creditsInput.placeholder = 'Credits';
    creditsInput.min = '1';
    creditsInput.max = '4';
    creditsInput.value = '3';
    creditsInput.setAttribute('aria-label', 'Subject credits');

    const marksInput = document.createElement('input');
    marksInput.type = 'number';
    marksInput.classList.add('input-field', 'subject-marks');
    marksInput.placeholder = 'Marks';
    marksInput.min = '0';
    marksInput.max = '100';
    marksInput.setAttribute('aria-label', 'Subject marks');

    const gradeDisplay = document.createElement('div');
    gradeDisplay.classList.add('grade-display');
    gradeDisplay.textContent = '-';
    gradeDisplay.setAttribute('aria-label', 'Calculated grade');

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerHTML = '×';
    removeBtn.setAttribute('aria-label', 'Remove subject');
    removeBtn.onclick = () => removeSubjectRow(row);

    // Add real-time grade calculation
    marksInput.addEventListener('input', () => {
        updateGradeDisplay(marksInput, gradeDisplay);
    });

    row.appendChild(subjectInput);
    row.appendChild(creditsInput);
    row.appendChild(marksInput);
    row.appendChild(gradeDisplay);
    row.appendChild(removeBtn);

    subjectCount++;
    return row;
}

/**
 * Add a new subject row to the container
 */
function addSubjectRow() {
    const row = createSubjectRow();
    subjectsContainer.appendChild(row);

    // Trigger reflow for animation
    requestAnimationFrame(() => {
        row.style.animationDelay = '0s';
    });
}

/**
 * Remove a subject row with animation
 * @param {HTMLElement} row - The row element to remove
 */
function removeSubjectRow(row) {
    // Prevent removing all rows
    if (subjectsContainer.children.length <= 1) {
        alert('You must have at least one subject!');
        return;
    }

    row.style.animation = 'staggerSlideUp 0.3s ease-out reverse';
    setTimeout(() => {
        row.remove();
    }, 300);
}

/**
 * Initialize the default 3 subject rows
 */
function initializeSubjectRows() {
    for (let i = 0; i < 3; i++) {
        const row = createSubjectRow(i);
        subjectsContainer.appendChild(row);
    }
}

// ===================================
// LPU Grade Calculation
// ===================================

/**
 * Calculate LPU letter grade from marks (10-point scale)
 * @param {number} marks - The marks scored (0-100)
 * @returns {string} LPU Letter grade (O, A+, A, B+, B, C, D, E, F)
 */
function calculateLPUGrade(marks) {
    if (marks >= 90) return 'O';
    if (marks >= 80) return 'A+';
    if (marks >= 70) return 'A';
    if (marks >= 60) return 'B+';
    if (marks >= 50) return 'B';
    if (marks >= 45) return 'C';
    if (marks >= 40) return 'D';
    if (marks >= 30) return 'E';
    return 'F';
}

/**
 * Get LPU grade points from letter grade
 * @param {string} grade - The letter grade
 * @returns {number} Grade points on 10-point scale
 */
function getGradePoints(grade) {
    const gradeMap = {
        'O': 10,
        'A+': 9,
        'A': 8,
        'B+': 7,
        'B': 6,
        'C': 5,
        'D': 4,
        'E': 0,
        'F': 0
    };
    return gradeMap[grade] || 0;
}

/**
 * Update grade display in subject row
 * @param {HTMLElement} marksInput - The marks input element
 * @param {HTMLElement} gradeDisplay - The grade display element
 */
function updateGradeDisplay(marksInput, gradeDisplay) {
    const marks = parseFloat(marksInput.value);

    if (isNaN(marks) || marks < 0 || marks > 100) {
        gradeDisplay.textContent = '-';
        gradeDisplay.className = 'grade-display';
        return;
    }

    const grade = calculateLPUGrade(marks);
    gradeDisplay.textContent = grade;
    gradeDisplay.className = 'grade-display grade-' + grade.replace('+', '-plus');
}

/**
 * Calculate overall grade from TGPA
 * @param {number} tgpa - The TGPA value
 * @returns {string} Overall letter grade
 */
function calculateOverallGrade(tgpa) {
    if (tgpa >= 9.0) return 'O';
    if (tgpa >= 8.0) return 'A+';
    if (tgpa >= 7.0) return 'A';
    if (tgpa >= 6.0) return 'B+';
    if (tgpa >= 5.0) return 'B';
    if (tgpa >= 4.5) return 'C';
    if (tgpa >= 4.0) return 'D';
    return 'F';
}

/**
 * Convert CGPA/TGPA to percentage (LPU formula)
 * @param {number} gpa - The GPA value
 * @returns {number} Percentage value
 */
function gpaToPercentage(gpa) {
    return gpa * 9.5;
}

/**
 * Validate and calculate TGPA and grades
 */
function calculateGrades() {
    const rows = subjectsContainer.querySelectorAll('.subject-row');
    let totalGradePoints = 0;
    let totalCredits = 0;
    let isValid = true;

    // Validate and collect data
    rows.forEach(row => {
        const subjectName = row.querySelector('.subject-name').value.trim();
        const credits = parseInt(row.querySelector('.subject-credits').value);
        const marks = parseFloat(row.querySelector('.subject-marks').value);

        if (!subjectName) {
            alert('Please enter all subject names!');
            isValid = false;
            return;
        }

        if (isNaN(credits) || credits < 1 || credits > 4) {
            alert('Please enter valid credits (1-4) for all subjects!');
            isValid = false;
            return;
        }

        if (isNaN(marks) || marks < 0 || marks > 100) {
            alert('Please enter valid marks (0-100) for all subjects!');
            isValid = false;
            return;
        }

        const grade = calculateLPUGrade(marks);
        const gradePoints = getGradePoints(grade);
        totalGradePoints += gradePoints * credits;
        totalCredits += credits;
    });

    if (!isValid) return;

    if (totalCredits === 0) {
        alert('Total credits cannot be zero!');
        return;
    }

    // Calculate TGPA
    const tgpa = totalGradePoints / totalCredits;

    // Calculate percentagekjgkjgk
    const percentage = gpaToPercentage(tgpa);

    // Calculate overall grade
    const overallGrade = calculateOverallGrade(tgpa);

    // Display results with animation
    displayResults(totalCredits, tgpa, percentage, overallGrade);
}

/**
 * Display calculation results with animations
 * @param {number} credits - Total credits
 * @param {number} tgpa - The calculated TGPA
 * @param {number} percentage - The calculated percentage
 * @param {string} overallGrade - The overall letter grade
 */
function displayResults(credits, tgpa, percentage, overallGrade) {
    // Update values
    creditsResult.textContent = credits;
    tgpaResult.textContent = tgpa.toFixed(2);
    percentageResult.textContent = `${percentage.toFixed(2)}%`;
    // gradeResult.textContent = overallGrade;
    gradeResult.textContent = "Overall Grade: " + overallGrade;

    gradeResult.className = 'result-value grade-badge grade-' + overallGrade.replace('+', '-plus');

    // Show results section with animation
    resultsSection.classList.remove('hidden');

    // Trigger reflow for animation
    requestAnimationFrame(() => {
        resultsSection.style.animation = 'resultsReveal 0.6s ease-out';
    });

    // Smooth scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/**
 * Clear all inputs and hide results
 */
function clearAll() {
    // Clear all input fields
    const inputs = subjectsContainer.querySelectorAll('.input-field');
    inputs.forEach(input => {
        if (input.classList.contains('subject-credits')) {
            input.value = '3'; // Reset credits to default
        } else {
            input.value = '';
        }
    });

    // Clear all grade displays
    const gradeDisplays = subjectsContainer.querySelectorAll('.grade-display');
    gradeDisplays.forEach(display => {
        display.textContent = '-';
        display.className = 'grade-display';
    });

    // Hide results
    resultsSection.classList.add('hidden');

    // Reset to 3 subject rows
    while (subjectsContainer.children.length > 3) {
        subjectsContainer.lastChild.remove();
    }

    while (subjectsContainer.children.length < 3) {
        addSubjectRow();
    }
}

// ===================================
// Subject Template Loading
// ===================================

/**
 * Load pre-built subjects for selected semesters
 */
function loadSubjectsForSemester() {
    // Get all checked semester checkboxes
    const checkboxes = document.querySelectorAll('.semester-checkbox:checked');
    const selectedSemesters = Array.from(checkboxes).map(cb => cb.value);

    if (selectedSemesters.length === 0) {
        alert('Please select at least one semester!');
        return;
    }

    // Clear existing subjects
    subjectsContainer.innerHTML = '';
    subjectCount = 0;

    let allSubjects = [];
    let totalCredits = 0;

    // Collect subjects from all selected semesters
    selectedSemesters.forEach(semester => {
        const semesterSubjects = lpuSubjects[semester];
        if (semesterSubjects && semesterSubjects.length > 0) {
            allSubjects = allSubjects.concat(semesterSubjects);
            totalCredits += semesterSubjects.reduce((sum, s) => sum + s.credits, 0);
        }
    });

    if (allSubjects.length === 0) {
        alert('No subjects found for selected semesters!');
        return;
    }

    // Add all subjects to the container
    allSubjects.forEach((subject, index) => {
        const row = createSubjectRow(index);

        // Pre-fill subject name and credits
        row.querySelector('.subject-name').value = subject.name;
        row.querySelector('.subject-credits').value = subject.credits;

        subjectsContainer.appendChild(row);
    });

    // Scroll to subjects
    setTimeout(() => {
        subjectsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // Show success message
    const semesterText = selectedSemesters.length === 1
        ? `Semester ${selectedSemesters[0]}`
        : `Semesters ${selectedSemesters.join(', ')}`;

    console.log(`Loaded ${allSubjects.length} subjects with ${totalCredits} total credits from ${semesterText}`);
}

// ===================================
// Event Listeners
// ===================================

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Add subject button
addSubjectBtn.addEventListener('click', addSubjectRow);

// Load subjects button
loadSubjectsBtn.addEventListener('click', loadSubjectsForSemester);

// Calculate button
calculateBtn.addEventListener('click', calculateGrades);

// Clear button
clearBtn.addEventListener('click', clearAll);

// Enter key to calculate
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('input-field')) {
            calculateGrades();
        }
    }
});

// ===================================
// Initialization
// ===================================

/**
 * Initialize the application
 */
function init() {
    initializeTheme();
    initializeSubjectRows();

    // Add page load completion class for animations
    setTimeout(() => {
        body.classList.add('loaded');
    }, 500);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
