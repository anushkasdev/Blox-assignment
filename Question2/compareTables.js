function compareTables(table1, table2) {
    if (table1.length !== table2.length) {
        console.log(`Row count mismatch: ${table1.length} vs ${table2.length}`);
        return false;
    }

    for (let i = 0; i < table1.length; i++) {
        const row1 = table1[i];
        const row2 = table2[i];

        const keys1 = Object.keys(row1);
        const keys2 = Object.keys(row2);

        if (keys1.length !== keys2.length) {
            console.log(`Column count mismatch in row ${i}`);
            return false;
        }

        for (const key of keys1) {
            if (!(key in row2) || row1[key] !== row2[key]) {
                console.log(`Mismatch at row ${i}, column ${key}`);
                return false;
            }
        }
    }
    return true;
}

const localDB = [
    { id: "1", name: "Anu", age: "23" },
    { id: "2", name: "Ravi", age: "30" }
];

const cloudDB = [
    { id: "1", name: "Anu", age: "23" },
    { id: "2", name: "Ravi", age: "30" }
];

if (compareTables(localDB, cloudDB)) {
    console.log("Migration verification SUCCESS: Tables match!");
} else {
    console.log("Migration verification FAILED: Tables mismatch!");
}
