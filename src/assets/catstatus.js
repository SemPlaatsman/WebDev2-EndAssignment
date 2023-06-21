const catStatus = {
    Lost: 0,
    Found: 1,
    InShelter: 2
};


function statusToName(status) {
    for (const [name, value] of Object.entries(catStatus)) {
        if (value === status) {
            return name;
        }
    }
    return "Unknown";
}


export { catStatus, statusToName }