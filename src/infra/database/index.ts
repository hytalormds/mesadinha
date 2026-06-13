import { DtMoneyDataSource } from "./typeorm/mesadinha/data-source";
import { SeederService } from "./typeorm/mesadinha/seeders";

export const connect = async () => {
  try {
    console.info("[DATABASE] Connecting...");

    await Promise.all([DtMoneyDataSource.initialize()]);

    const seeder = new SeederService(DtMoneyDataSource);
    await seeder.run();

    console.log("🌱 Seeders rodados com sucesso!");

    console.info("[DATABASE] Connected.");
  } catch (error) {
    console.error("[DATABASE] Conection error.", error);

    throw error;
  }
};
