

figma.showUI(__html__);
figma.ui.resize(500,500)





class TextNodeData{
  id: string;
  node: TextNode;
  text : string;
  final_text :string;


  constructor(node: TextNode){
    this.id =node.id;
    this.node= node;
    this.text = node.characters;
    this.final_text = "";
  }
} 

const LTR  = 'LTR';
const RTL = 'RTL'
var direction = LTR;

function changeDirection(){
  if(direction === RTL){
    direction = LTR
  }else{
    direction = RTL
  }
}

 function detectTextsOfFrame(frame:FrameNode){
      
  const textNodes:TextNode[] = frame.children.filter(node =>node.type ==="TEXT") as TextNode[]

  textNodes.forEach(text_node => {        
        if(selected_text_nodes.find(element=>element.node.id ===text_node.id) == null){ 
          selected_text_nodes.push(new TextNodeData(text_node));
        }
  });
}

function detectText(text_node:TextNode){
      
  selected_text_nodes.push(new TextNodeData(text_node));

}


function reverseString(str:string) {
  return str.split("").reverse().join("");
}

function showNotification(message : string){
  figma.notify(message);
}

var selected_text_nodes:Array<TextNodeData> = [];

figma.on("selectionchange", () => {
  selected_text_nodes = [];

  for(const node of figma.currentPage.selection){
    if(node.type ==="FRAME"){
      const frame = node;
      detectTextsOfFrame(frame);      
    }else if(node.type === "TEXT"){
      const text = node;
      detectText(text);
    }
  }
  figma.ui.postMessage({
    'type' : "detect_texts",
    'data' : selected_text_nodes
  })

  console.warn(selected_text_nodes)
})

figma.ui.onmessage = async msg => {

  var command_type = msg['type']; 

  switch(command_type){
    case "change_direction" :
   
      changeDirection();

      figma.ui.postMessage( {
        'type' : command_type,
        'data' : direction
      })
      
    return;
    case "apply_changes":
      const final_data:Array<TextNodeData> = msg['text_data'] as Array<TextNodeData>;
      selected_text_nodes.forEach(async node_data =>{
        var text_node = node_data.node;
        var selected_text = final_data.find(d => d.id == text_node.id);
        if(selected_text.final_text.length !== 0){
          if(direction === LTR){
            text_node.characters = selected_text.final_text;
          }else{
            text_node.characters = reverseString(selected_text.final_text);
          }
        } 
      });
      showNotification("changes applied");
    break;

    case "delete_text":

      break;
  }


};


