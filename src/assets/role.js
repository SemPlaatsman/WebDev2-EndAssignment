const roles = {
    Customer: 0,
    Employee: 1
};


function roleToName(role) {
    for (const [name, value] of Object.entries(roles)) {
        if (value === role) {
            return name;
        }
    }
    return ;
}

// function nameToStatus(roleName) {
//     for (const [name, value] of Object.entries(roles)) {
//         if (name.toLowerCase() === roleName.toLowerCase()) {
//             return value;
//         }
//     }
//     return null;
// }

export { roles, roleToName }