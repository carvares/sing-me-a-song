import "./setup";
import app from "./app";

const port =  process.env.PORT

app.listen(port, () => {
  console.log(`Server is listening on port ${port} using database:`,process.env.DB_DATABASE);
});
