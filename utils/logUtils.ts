import chalk from "chalk";

export default {
    ErrorLog: (id: String, err: any) => {
        console.log(chalk.red(`[Error] ID: ${id}:`));
        console.error(err);
        console.log("\n");
    },

    logCustom(prefix: string, name: string): void {
        console.log(chalk.blue(`[${prefix}] ${name}`))
    }
}