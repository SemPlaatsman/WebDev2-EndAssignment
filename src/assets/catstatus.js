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
    return null;
}

function nameToStatus(statusName) {
    for (const [name, value] of Object.entries(catStatus)) {
        if (name.toLowerCase() === statusName.toLowerCase()) {
            return value;
        }
    }
    return null;
}

export { catStatus, statusToName, nameToStatus }