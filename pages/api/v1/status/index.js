import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersion = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersion.rows[0].server_version;

  const databaseMaxConnections = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue =
    databaseMaxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnections.rows[0].count;

  console.log(process.env.NODE_ENV);
  /*console.log(databaseVersion.rows[0].server_version);
  console.log(databaseMaxConnections.rows[0].max_connections);
  console.log(databaseOpenedConnections);*/
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      version: databaseVersionValue,
      max_connections: parseInt(databaseMaxConnectionsValue),
      opened_connections: databaseOpenedConnectionsValue,
    },
  });
}

export default status;
