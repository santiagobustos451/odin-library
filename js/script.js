document.addEventListener('click', handleClick);

function handleClick(e){
    const isDropdownButton = e.target.matches("[data-dropdown-button]");

    if(isDropdownButton){
        currentDropdown = e.target.closest("[data-dropdown]")
        currentDropdownMenu = currentDropdown.querySelector("[data-dropdown-menu]")
        currentDropdownMenu.classList.toggle("active")
    }


}