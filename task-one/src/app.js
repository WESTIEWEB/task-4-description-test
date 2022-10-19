import FileTree from  './fileTree'

export function createFileTree(input) {


    // to not mutate the file
  let tree = JSON.parse(JSON.stringify(input))

  let treeInput = []; // this is an empty container to holde array of node without parentID, and array of nodes with parentID

  //sorts  the tree array, to get arrays of node with/without parentID
  tree.forEach(obj => {
    if(!obj.parentId){
      treeInput.push([obj])
    } else{
      treeInput.push(tree.sort((a,b) => a.parentId-b.parentId))
    }
    
  });

  console.log(treeInput)
  const fileTree = new FileTree();

  for (const inputNode of treeInput.flat(20)) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}


