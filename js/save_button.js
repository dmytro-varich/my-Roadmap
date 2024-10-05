import { setCookie, deleteCookie, getCookie } from "./cookieUtils.js";

document.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const button = document.getElementById('SaveButton');
    // let isHidden = false; // Visibility status of elements
    let isHidden = getCookie('buttonState') === 'true';
    updateButtonState(isHidden);
    
    // Function to remove red border on focus or input
    function removeRedBorderOnInput(input) {
        input.addEventListener('focus', function () {
            input.style.backgroundColor = "";
            input.style.borderRadius = "";
            input.style.border = "2px solid transparent";
        });

        input.addEventListener('input', function () {
            input.style.backgroundColor = "";
            input.style.borderRadius = "";
            input.style.border = "2px solid transparent";
        });

        input.addEventListener('blur', function () {
            input.style.backgroundColor = "";
            input.style.borderRadius = "";
            input.style.border = "2px solid transparent";
        });
    }

    button.addEventListener('click', () => {
        let timelineGroups = document.querySelectorAll('.timeline-group');
        let allInputsValid = true; // Flag to check the validity of all inputs
        let hasAtLeastOneFilled = false; 
        let isGroupstoDelete = false; 

        // Array for empty groups to be deleted
        let groupsToDelete = [];
        timelineGroups.forEach(group => {
            const input = group.querySelector('.enter-name-text');
            const textarea = group.querySelector('.enter-description-text');

            // Reset border to transparent before validation
            input.style.border = '2px solid transparent';

            // Check if textarea is filled but input is empty
            if (textarea.value.trim() !== "" && input.value.trim() === "") {
                input.style.backgroundColor = "rgba(255, 92, 92, .09)";
                input.style.borderRadius = "8px";
                input.style.border = "2px solid rgba(255,74,86,1)";
                input.value = "";
                input.style.height = '26px';
                allInputsValid = false; // Block button text change on error
                
                removeRedBorderOnInput(input);
            }

            // Check if at least one input or textarea is filled
            if (input.value.trim() !== "" || textarea.value.trim() !== "") {
                hasAtLeastOneFilled = true;
            } else {
                // Add group to the array for deletion if both fields are empty
                groupsToDelete.push(group);
                isGroupstoDelete = true;
            }

            groupsToDelete.forEach(group => {
                group.remove();
            });
            
            // Merge remaining groups, removing spacing between them
            let remainingGroups = document.querySelectorAll('.timeline-group');
            remainingGroups.forEach((group, index) => {
                if (index === 0) {
                    group.style.marginTop = "0"; 
                } 
                else {
                    group.style.marginTop = isMobile ? "-20px" : "-17px"; 
                }
            });

        });

        if (!hasAtLeastOneFilled) {
            document.querySelectorAll('.enter-name-text').forEach(input => {
                input.style.border = '2px solid transparent';
            });
            alert("All fields can't be empty. At least one must be filled in.");
            return; // Stop function if no fields are filled
        }

        if (allInputsValid) {
            isHidden = !isHidden;
            setCookie('buttonState', isHidden, 7);
            updateButtonState(isHidden);

            // Remove empty timeline groups
            if (isGroupstoDelete) {
                groupsToDelete.forEach(group => {
                    group.remove();
                });
                timelineGroups = document.querySelectorAll('.timeline-group'); // Update list after removal
                // console.log(timelineGroups);
                isGroupstoDelete = false;
            }

            const lastTimelineGroup = timelineGroups[timelineGroups.length - 1];
            const lastLine = lastTimelineGroup.querySelector('.line');

            if (isHidden) {
                setCookie('timelineGroupCount', timelineGroups.length, 7);
            } else {
                deleteCookie('timelineGroupCount');
            }

            timelineGroups.forEach((group, index) => {
                const input = group.querySelector('.enter-name-text');
                const textarea = group.querySelector('.enter-description-text');
                const line = group.querySelector('.line');
                
                let lineHeight;
                lineHeight = line && line.offsetHeight ? line.offsetHeight : 130;
                
                if (input.value.trim() !== "" && textarea.value.trim() === "") {
                    textarea.placeholder = isHidden ? "" : "Describe this waypoint..."; // Remove placeholder in Finish mode
                }

                if (isHidden) {
                    setCookie(`timelineTitle_${index}`, input.value, 7);
                    // setCookie(`timelineDescription_${index}`, encodeURIComponent(textarea.value), 7);
                    localStorage.setItem(`timelineDescription_${index}`, textarea.value);
                    setCookie(`timelineHeightDescription_${index}`, textarea.style.height, 7);
                    setCookie(`timelineLineHeight_${index}`, lineHeight, 7);

                } else {
                    deleteCookie(`timelineTitle_${index}`);
                    // deleteCookie(`timelineDescription_${index}`);
                    localStorage.removeItem(`timelineDescription_${index}`);
                    deleteCookie(`timelineHeightDescription_${index}`);
                    deleteCookie(`timelineLineHeight_${index}`);
                }

                input.readOnly = isHidden ? true : false;
                
                textarea.readOnly = isHidden ? true : false;

                input.style.border = '2px solid transparent';
            });

            if (lastLine) {
                lastLine.style.visibility = isHidden ? 'hidden' : 'visible';
            }

            const groups = document.querySelectorAll('.timeline-group');
            let lastVisibleGroup = null;

            // We are looking for the last visible timeline group
            groups.forEach(group => {
                if (group.style.display !== 'none' && group.querySelector('.enter-name-text').value.trim() !== '') {
                    lastVisibleGroup = group;
                }
            });

            // If you find the last visible group
            if (lastVisibleGroup) {
                let addIcon = lastVisibleGroup.querySelector('.add-icon');
                if (addIcon) {
                    if (isHidden) {
                        // We hide the element, but it continues to occupy a place in the layout
                        addIcon.style.opacity = 0;
                        addIcon.style.visibility = 'hidden';
                        addIcon.style.display = 'block';
                    } else {
                        // show the element, it already takes its place
                        addIcon.style.display = 'block';
                        addIcon.style.visibility = 'visible';
                        addIcon.style.opacity = 1;
                    }
                }
            }

        }
    });

    function updateButtonState(isHidden) {
        const button = document.getElementById('SaveButton');
        button.textContent = isHidden ? 'Edit' : 'Finish';
        button.style.backgroundColor = isHidden ? '#eac300' : '#00ea4a';
        const pdfButton = document.getElementById('pdfButton');
        pdfButton.style.display = isHidden ? 'block' : 'none';
    }
});
