import FileTree from './fileTree';

export function createFileTree(input) {


  // to not mutate the file
  let tree = JSON.parse(JSON.stringify(input))

  let treeInput = []; // this is an empty container to holde array of node without parentID, and array of nodes with parentID

  //sorts  the tree array, to get arrays of node with/without parentID
  tree.array.forEach(node => {
    if(!node.id){
      treeInput.push([node.id])
    } else{
      let tosort = [];
      tosort.push(node.id);
      treeInput.push(tosort.sort((a,b) => a-b))
    }
    
  });

  const fileTree = new FileTree();

  for (const inputNode of treeInput.flat(3)) {
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

