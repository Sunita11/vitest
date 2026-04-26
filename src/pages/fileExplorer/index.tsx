import FileExplorer from "../../components/fileExplorer";

const fileSystemData = {
  id: "root",
  name: "root",
  type: "folder",
  children: [
    {
      id: "1",
      name: "src",
      type: "folder",
      children: [
        {
          id: "2",
          name: "components",
          type: "folder",
          children: [
            { id: "3", name: "Button.jsx", type: "file" },
            { id: "4", name: "Card.jsx", type: "file" },
          ],
        },
        { id: "5", name: "App.jsx", type: "file" },
        { id: "6", name: "index.js", type: "file" },
      ],
    },
    {
      id: "7",
      name: "public",
      type: "folder",
      children: [
        { id: "8", name: "index.html", type: "file" },
        { id: "9", name: "favicon.ico", type: "file" },
      ],
    },
    { id: "10", name: "package.json", type: "file" },
    { id: "11", name: "README.md", type: "file" },
  ],
};
function FileExp() {
  return (
    <>
      <h4>File Explorer</h4>
      <FileExplorer data={fileSystemData} />
    </>
  );
}

export default FileExp;
