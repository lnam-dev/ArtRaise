export function getRobotaWord(count: number): string {
    const lastTwo = count % 100;
    const last = count % 10;

    if (lastTwo >= 11 && lastTwo <= 14) {
        return "робіт";
    }
    if (last === 1) {
        return "робота";
    }
    if (last >= 2 && last <= 4) {
        return "роботи";
    }
    return "робіт";
}
