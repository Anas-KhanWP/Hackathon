document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const workExperienceContainer = document.getElementById('work-experience-container') as HTMLDivElement;
    const skillsContainer = document.getElementById('skills-container') as HTMLDivElement;
    const educationContainer = document.getElementById('education-container') as HTMLDivElement;
    const addWorkExperienceButton = document.getElementById('add-work-experience') as HTMLButtonElement;
    const addSkillButton = document.getElementById('add-skill') as HTMLButtonElement;
    const addEducationButton = document.getElementById('add-education') as HTMLButtonElement;
    const profileImageInput = document.getElementById('profile-image') as HTMLInputElement;
    const resumeImage = document.getElementById('resume-image') as HTMLImageElement; // Make sure you have an img element in the resume section to display the image.
    const resumeContainer = document.getElementById('resume-section') as HTMLDivElement;
    const loader = document.getElementById('loader') as HTMLDivElement;
    const formSectionHead = document.getElementById('form-section') as HTMLDivElement;
    const educationContainerForPen = document.getElementById('resume-education-details') as HTMLDivElement;
    const skillsContainerForPen = document.getElementById('resume-skills-list') as HTMLDivElement;
    const workExperienceContainerForPen = document.getElementById('experiences') as HTMLDivElement;
    const shareSection = document.getElementById('share-section') as HTMLDivElement;
    const resumeLinkInput = document.getElementById('resume-link') as HTMLInputElement;
    const copyLinkButton = document.getElementById('copy-link') as HTMLButtonElement;


    // Initially hide the resume container
    resumeContainer.style.display = 'none';
    loader.style.display = 'none';

    // Function to add edit functionality to each section
    function addEditFunctionality(container: HTMLDivElement, sectionType: string) {
        const editIcon = document.createElement('span');
        editIcon.classList.add('edit-icon');
        editIcon.textContent = '✎'; // You can use an icon here
        editIcon.addEventListener('click', () => {
            showEditForm(sectionType);
        });
        container.classList.add('editable-section');
        container.appendChild(editIcon);
    }   

    // Function to show the edit form
    function showEditForm(sectionType: string) {
        resumeContainer.style.display = 'none';
        formSectionHead.style.display = 'block';
        form.style.display = 'block';
        form.style.opacity = '1';
    }

    // Function to update the profile image
    function updateProfileImage() {
        const file = profileImageInput.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                resumeImage.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    // Event listener for the image input
    profileImageInput.addEventListener('change', updateProfileImage);

    // Function to add a new work experience entry
    function addWorkExperienceEntry(e: Event) {
        e.preventDefault();
        const workExperienceDiv = document.createElement('div');
        workExperienceDiv.classList.add('job');

        const jobTitleInput = document.createElement('input');
        jobTitleInput.type = 'text';
        jobTitleInput.required = true;
        jobTitleInput.placeholder = 'Job Title';
        jobTitleInput.classList.add('jobTitle');

        const companyInput = document.createElement('input');
        companyInput.type = 'text';
        companyInput.required = true;
        companyInput.placeholder = 'Company';
        companyInput.classList.add('companyTitle');

        const tenureContainer = document.createElement('div');
        tenureContainer.classList.add('tenureContainer');

        const startDateContainer = document.createElement('div');
        startDateContainer.classList.add('startDate');

        const startDateHeading = document.createElement('h3');
        startDateHeading.textContent = 'Start Date';

        const startDate = document.createElement('input');
        startDate.type = 'month';
        startDate.classList.add('startDateInput');
        startDate.required = true;

        const endDateContainer = document.createElement('div');
        endDateContainer.classList.add('endDate');

        const endDateHeading = document.createElement('h3');
        endDateHeading.textContent = 'End Date';

        const endDate = document.createElement('input');
        endDate.type = 'month';
        endDate.classList.add('endDateInput');
        endDate.required = true;

        const cWcontainer = document.createElement('div');
        cWcontainer.classList.add('currentlyWorkingContainer');

        const currentlyWorkingLabel = document.createElement('label');
        currentlyWorkingLabel.htmlFor = 'currentlyWorking';
        currentlyWorkingLabel.textContent = 'Currently Working';

        const currentlyWorking = document.createElement('input');
        currentlyWorking.type = 'checkbox';
        currentlyWorking.classList.add('currentlyWorking');
        currentlyWorking.name = 'currentlyWorking';

        // Handle "Currently Working" checkbox logic
        currentlyWorking.addEventListener('change', () => {
            if (currentlyWorking.checked) {
                endDate.disabled = true;
                endDate.required = false;
                // endDate.value = 'Current';
            } else {
                endDate.disabled = false;
                // endDate.value = '';
            }
        });

        cWcontainer.appendChild(currentlyWorkingLabel);
        cWcontainer.appendChild(currentlyWorking);

        tenureContainer.appendChild(startDateContainer);
        startDateContainer.appendChild(startDateHeading);
        startDateContainer.appendChild(startDate);

        tenureContainer.appendChild(endDateContainer);
        endDateContainer.appendChild(endDateHeading);
        endDateContainer.appendChild(endDate);

        const responsibilitiesContainer = document.createElement('div');
        responsibilitiesContainer.classList.add('responsibilities-container');

        const responsibilitiesHeading = document.createElement('h2');
        responsibilitiesHeading.textContent = 'Responsibilities';

        const addResponsibilityButton = document.createElement('button');
        addResponsibilityButton.textContent = '+';
        addResponsibilityButton.classList.add('add-responsibility-btn');
        addResponsibilityButton.addEventListener('click', (e) => {
            addResponsibility(responsibilitiesContainer, e);
        });

        const responsibilitiesList = document.createElement('ul');
        responsibilitiesList.classList.add('responsibilities-list');

        responsibilitiesContainer.appendChild(responsibilitiesHeading);
        responsibilitiesContainer.appendChild(addResponsibilityButton);
        responsibilitiesContainer.appendChild(responsibilitiesList);

        workExperienceDiv.appendChild(jobTitleInput);
        workExperienceDiv.appendChild(companyInput);
        workExperienceDiv.appendChild(tenureContainer);
        workExperienceDiv.appendChild(cWcontainer);
        workExperienceDiv.appendChild(responsibilitiesContainer);
        workExperienceContainer.appendChild(workExperienceDiv);
    }

    // Function to add a new responsibility
    function addResponsibility(container: HTMLDivElement, e: Event) {
        e.preventDefault();
        const responsibilitiesList = container.querySelector('.responsibilities-list') as HTMLUListElement;

        const responsibilityInput = document.createElement('input');
        responsibilityInput.type = 'text';
        responsibilityInput.placeholder = 'Responsibility';

        const responsibilityItem = document.createElement('li');
        responsibilityItem.appendChild(responsibilityInput);

        responsibilitiesList.appendChild(responsibilityItem);
    }

    // Function to add a new skill entry
    function addSkillEntry(e: Event) {
        e.preventDefault();
        const skillInput = document.createElement('input');
        skillInput.type = 'text';
        skillInput.placeholder = 'Skill';
        skillInput.classList.add('skill-input');
        skillInput.required = true;

        skillsContainer.appendChild(skillInput);
    }

    // Function to add a new education entry
    function addEducationEntry(e: Event) {
        e.preventDefault();
        const educationDiv = document.createElement('div');
        educationDiv.classList.add('education-entry');

        const degreeInput = document.createElement('input');
        degreeInput.type = 'text';
        degreeInput.placeholder = 'Degree';
        degreeInput.classList.add('degreeInput');
        degreeInput.required = true;

        const institutionInput = document.createElement('input');
        institutionInput.type = 'text';
        institutionInput.placeholder = 'Institution';
        institutionInput.classList.add('schoolInput');
        institutionInput.required = true;

        const tenureContainer = document.createElement('div');
        tenureContainer.classList.add('tenureContainer');

        const startDateContainer = document.createElement('div');
        startDateContainer.classList.add('startDate');

        const startDateHeading = document.createElement('h3');
        startDateHeading.textContent = 'Start Date';

        const startDate = document.createElement('input');
        startDate.type = 'month';
        startDate.classList.add('startDateInput');
        startDate.required = true;

        const endDateContainer = document.createElement('div');
        endDateContainer.classList.add('endDate');

        const endDateHeading = document.createElement('h3');
        endDateHeading.textContent = 'End Date';

        const endDate = document.createElement('input');
        endDate.type = 'month';
        endDate.classList.add('endDateInput');
        endDate.required = true;

        const cAcontainer = document.createElement('div');
        cAcontainer.classList.add('currentlyAttendingContainer');

        const currentlyAttendingLabel = document.createElement('label');
        currentlyAttendingLabel.htmlFor = 'currentlyAttending';
        currentlyAttendingLabel.textContent = 'Currently Attending';

        const currentlyAttending = document.createElement('input');
        currentlyAttending.type = 'checkbox';
        currentlyAttending.classList.add('currentlyAttending');
        currentlyAttending.name = 'currentlyAttending';

        // Handle "Currently Attending" checkbox logic
        currentlyAttending.addEventListener('change', () => {
            if (currentlyAttending.checked) {
                endDate.disabled = true;
                // endDate.value = ''; // Clear the end date input
            } else {
                endDate.disabled = false;
            }
        });

        cAcontainer.appendChild(currentlyAttendingLabel);
        cAcontainer.appendChild(currentlyAttending);

        tenureContainer.appendChild(startDateContainer);
        startDateContainer.appendChild(startDateHeading);
        startDateContainer.appendChild(startDate);

        tenureContainer.appendChild(endDateContainer);
        endDateContainer.appendChild(endDateHeading);
        endDateContainer.appendChild(endDate);

        educationDiv.appendChild(degreeInput);
        educationDiv.appendChild(institutionInput);
        educationDiv.appendChild(tenureContainer);
        educationDiv.appendChild(cAcontainer);

        educationContainer.appendChild(educationDiv);
    }

    // Event listener for the "Add Work Experience" button
    addWorkExperienceButton.addEventListener('click', addWorkExperienceEntry);

    // Event listener for the "Add Skill" button
    addSkillButton.addEventListener('click', addSkillEntry);

    // Event listener for the "Add Education" button
    addEducationButton.addEventListener('click', addEducationEntry);

    function serializeResumeData(): object {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const username = (document.getElementById('username') as HTMLInputElement).value;

        // Collect work experiences
        const workExperiences = Array.from(workExperienceContainer.querySelectorAll('.job')).map((jobDiv) => {
            return {
                jobTitle: (jobDiv.querySelector('.jobTitle') as HTMLInputElement).value,
                company: (jobDiv.querySelector('.companyTitle') as HTMLInputElement).value,
                startDate: (jobDiv.querySelector('.startDateInput') as HTMLInputElement).value,
                endDate: (jobDiv.querySelector('.endDateInput') as HTMLInputElement).value,
                currentlyWorking: (jobDiv.querySelector('.currentlyWorking') as HTMLInputElement).checked,
                responsibilities: Array.from((jobDiv.querySelector('.responsibilities-list') as HTMLUListElement).children).map((li) => {
                    return (li.querySelector('input') as HTMLInputElement).value;
                })
            };
        });

        // Collect skills
        const skills = Array.from(skillsContainer.querySelectorAll('.skill-input')).map((input) => {
            return (input as HTMLInputElement).value;
        });

        // Collect education entries
        const educationEntries = Array.from(educationContainer.querySelectorAll('.education-entry')).map((entry) => {
            return {
                degree: (entry.querySelector('.degreeInput') as HTMLInputElement).value,
                institution: (entry.querySelector('.schoolInput') as HTMLInputElement).value,
                startDate: (entry.querySelector('.startDateInput') as HTMLInputElement).value,
                endDate: (entry.querySelector('.endDateInput') as HTMLInputElement).value,
                currentlyAttending: (entry.querySelector('.currentlyAttending') as HTMLInputElement).checked
            };
        });

        // Return the serialized data
        return {
            name,
            email,
            phone,
            username,
            workExperiences,
            skills,
            education: educationEntries,
        };
    }

    // Form submission handling
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Hide the form with a smooth transition
        form.style.transition = 'opacity 0.5s ease';
        form.style.opacity = '0';

        // Show the loader
        loader.style.display = 'block';

        const resumeData = serializeResumeData();

        try {
            const response = await fetch('/save-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: (document.getElementById('username') as HTMLInputElement).value,
                    resumeData
                }),
            });

            if (response.ok) {
                const { link } = await response.json();
                resumeLinkInput.value = link;
                shareSection.style.display = 'block';
            } else {
                alert('Error saving resume');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            loader.style.transition = 'opacity 0.5s ease';
            loader.style.opacity = '0';
            loader.style.display = 'none';
            form.style.display = 'none';
            resumeContainer.style.opacity = '1';
            formSectionHead.style.display = 'none';
        }

        setTimeout(() => {
            // After the transition and short delay, hide the form completely
            form.style.display = 'none';

            // Show the resume container
            resumeContainer.style.opacity = '0';
            resumeContainer.style.display = 'block';
            resumeContainer.style.transition = 'opacity 0.5s ease';

            // Get form data
            const name = (document.getElementById('name') as HTMLInputElement).value;
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const phone = (document.getElementById('phone') as HTMLInputElement).value;
            // const education = (document.getElementById('education') as HTMLTextAreaElement).value;

            const username = (document.getElementById('username') as HTMLInputElement).value;

            // Generate the resume link (assuming the resume is saved at the backend)
            const resumeLink = `./resume/${username}`;
            resumeLinkInput.value = resumeLink;

            // Show share section
            shareSection.style.display = 'block';

            // Update resume
            (document.getElementById('resume-name') as HTMLElement).textContent = name;
            (document.getElementById('resume-email-link') as HTMLElement).textContent = `${email}`;
            (document.getElementById('resume-email-link') as HTMLAnchorElement).href = `mailto:${email}`;
            (document.getElementById('resume-phone') as HTMLElement).textContent = phone;
            (document.getElementById('resume-phone') as HTMLAnchorElement).href = `tel:${phone}`;
            // (document.getElementById('resume-education-details') as HTMLElement).textContent = education;

            // Update education
            const resumeEducationContainer = document.getElementById('resume-education-details') as HTMLElement;
            resumeEducationContainer.innerHTML = ''; // Clear existing entries
            const educationEntries = educationContainer.querySelectorAll('.education-entry');
            educationEntries.forEach((educationEntry) => {
                const degree = (educationEntry.querySelector('.degreeInput') as HTMLInputElement).value;
                const school = (educationEntry.querySelector('.schoolInput') as HTMLInputElement).value;
                const startDate = (educationEntry.querySelector('.startDateInput') as HTMLInputElement).value;
                const endDateInput = (educationEntry.querySelector('.endDateInput') as HTMLInputElement);
                const endDate = endDateInput.disabled ? 'Current' : endDateInput.value;

                const educationItem = document.createElement('div');
                educationItem.classList.add('education-item');

                const degreeElem = document.createElement('h3');
                degreeElem.textContent = degree;

                const schoolDatesElem = document.createElement('p');
                schoolDatesElem.textContent = `${school}, ${startDate} - ${endDate}`;

                educationItem.appendChild(degreeElem);
                educationItem.appendChild(schoolDatesElem);

                resumeEducationContainer.appendChild(educationItem);
            });

            // Update work experience
            const resumeWorkExperience = document.getElementById('experiences') as HTMLElement;
            resumeWorkExperience.innerHTML = ''; // Clear existing entries
            const workExperienceDivs = workExperienceContainer.querySelectorAll('.job');
            workExperienceDivs.forEach((workExperienceDiv) => {
                const jobTitle = (workExperienceDiv.querySelector('.jobTitle') as HTMLInputElement).value;
                const company = (workExperienceDiv.querySelector('.companyTitle') as HTMLInputElement).value;
                const startDate = (workExperienceDiv.querySelector('.startDateInput') as HTMLInputElement).value;
                const endDateInput = (workExperienceDiv.querySelector('.endDateInput') as HTMLInputElement);
                const endDate = endDateInput.disabled ? 'Current' : endDateInput.value;

                const responsibilitiesList = workExperienceDiv.querySelector('.responsibilities-list') as HTMLUListElement;

                const workExperienceEntry = document.createElement('div');
                workExperienceEntry.classList.add('job');

                const jobTitleElem = document.createElement('h3');
                jobTitleElem.textContent = jobTitle;

                const companyDatesElem = document.createElement('p');
                companyDatesElem.textContent = `${company}, ${startDate} - ${endDate}`;

                const responsibilitiesElem = document.createElement('ul');
                Array.from(responsibilitiesList.children).forEach((li) => {
                    const responsibilityText = (li.querySelector('input') as HTMLInputElement).value;
                    const responsibilityElem = document.createElement('li');
                    responsibilityElem.textContent = responsibilityText;
                    responsibilitiesElem.appendChild(responsibilityElem);
                });

                workExperienceEntry.appendChild(jobTitleElem);
                workExperienceEntry.appendChild(companyDatesElem);
                workExperienceEntry.appendChild(responsibilitiesElem);

                resumeWorkExperience.appendChild(workExperienceEntry);
            });

            // Update skills
            const resumeSkillsList = document.getElementById('resume-skills-list') as HTMLUListElement;
            resumeSkillsList.innerHTML = ''; // Clear existing skills
            const skillInputs = skillsContainer.querySelectorAll('.skill-input');
            skillInputs.forEach((skillInput) => {
                const skill = (skillInput as HTMLInputElement).value;
                const skillElem = document.createElement('li');
                skillElem.textContent = skill;
                resumeSkillsList.appendChild(skillElem);
            });

            // Add edit functionality to each section
            addEditFunctionality(workExperienceContainerForPen, 'work');
            addEditFunctionality(skillsContainerForPen, 'skill');
            addEditFunctionality(educationContainerForPen, 'education');

            // Hide loader and smoothly show the resume container
            loader.style.transition = 'opacity 0.5s ease';
            loader.style.opacity = '0';
            loader.style.display = 'none';
            formSectionHead.style.display = 'none';
            resumeContainer.style.opacity = '1';
        }, 1000);

        copyLinkButton.addEventListener('click', () => {
            resumeLinkInput.select();
            document.execCommand('copy');
            alert('Resume link copied to clipboard!');
        });
    });
});
