import { JsonPostRespository } from "@/repositories/post/json-post-repository";
import { drizzleDb } from ".";
import { postTable } from "./schemas";

(async () => {
    const jsonPostRepositiry = new JsonPostRespository();
    const posts = await jsonPostRepositiry.findAll();
    try {
        await drizzleDb.insert(postTable).values(posts);
    } catch (e) {
        console.log("Ocorreu um erro");
        console.log("\n\n\n", e);
    }

})();