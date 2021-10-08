

figma.showUI(__html__);
figma.ui.resize(660,560)





class TextNodeData{
  id: string;
  node: TextNode;
  text : string;
  final_text :string;

  constructor(node: TextNode , text : string){
    this.id =node.id;
    this.node= node;
    this.text = text;
    this.final_text = "";
  }
} 

const LTR  = 'LTR';
const RTL = 'RTL'


 function detectTextsOfFrame(frame:FrameNode){
      
  const textNodes:TextNode[] = frame.children.filter(node =>node.type ==="TEXT") as TextNode[]

  textNodes.forEach(text_node => {        
        if(selected_text_nodes.find(element=>element.node.id ===text_node.id) == null){ 
          fillSelectedTextNodes(text_node);
        }
  });
}

function detectText(text_node:TextNode){
      
  fillSelectedTextNodes(text_node);

}

function fillSelectedTextNodes(text_node:TextNode){
  var text = text_node.characters;
  var direction = detectDirection(text);
  if(direction === RTL){
    text = reverseString(text);
  }
  selected_text_nodes.push(new TextNodeData(text_node ,text));
}

const LTR_ALPHAET = [
  "A", "a", "B" , "b" , "C", "c" ,  "D" ,  "d" ,  "E" ,  "e" ,  "F" ,  "f" ,  "G" ,  "g" ,  "H" ,  "h" ,  "I" ,  "i" ,  "J" ,  "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z",
];
const RTL_ALPHAET= [
   "ی", "ه" , "و" ,"ن" , "م" ,"ل","گ","ک","ق","ف","غ","ع","ظ","ط","ض","ص","ش","س","ژ","ز","ر","ذ","د","خ","ح","چ","ج","ث","ت","پ","ب","ا","آ","ء" 
];

function detectDirection(text :string){
  var firstChar = text[0];
  if(LTR_ALPHAET.indexOf(firstChar) !== -1){
    return LTR;
  }
  return RTL;
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

})

figma.ui.onmessage = async msg => {

  var command_type = msg['type']; 

  switch(command_type){
    
    case "apply_changes":
      const final_data:Array<TextNodeData> = msg['text_data'] as Array<TextNodeData>;
      selected_text_nodes.forEach(async node_data =>{
        var text_node = node_data.node as TextNode;
        var selected_text = final_data.find(d => d.id == text_node.id);        
        
        await figma.loadFontAsync(text_node.fontName as FontName);
        
        if(selected_text.final_text.length !== 0){
          var selected_text_direction = detectDirection(selected_text.final_text);
          if(selected_text_direction === LTR){
            text_node.characters = selected_text.final_text;
          }else{
            text_node.characters = reverseString(selected_text.final_text);
          }
        } 
      });
      showNotification("changes applied");
    break;

    case "delete_text":
      const text_node_id = msg['text_node_id'] as string;
      const text_node = selected_text_nodes.find(node => node.id === text_node_id) as TextNodeData;
      text_node.node.remove();
      selected_text_nodes = selected_text_nodes.filter(node => node.id !== text_node_id) as Array<TextNodeData> ;

      showNotification("text removed");

      figma.ui.postMessage({
        'type' : "detect_texts",
        'data' : selected_text_nodes
      })
      break;

      case "copy_text":
        const copy_text_node_id = msg['text_node_id'] as string;

        for (let i = 0; i < selected_text_nodes.length; i++) {
          if(selected_text_nodes[i].id === copy_text_node_id){
            selected_text_nodes[i].final_text = selected_text_nodes[i].text;
            break;
          }
          
        }    

        showNotification("text coppied");
  
        figma.ui.postMessage({
          'type' : "detect_texts",
          'data' : selected_text_nodes
        })
        break;

        case "replace":
          const replaceFrom = msg['replace_from'] as string;
          const replaceTo = msg['replace_to'] as string;
          console.log(replaceFrom);
          console.log(replaceTo);
          for (let i = 0; i < selected_text_nodes.length; i++) {
            if(replaceFrom === "*.*"){
              selected_text_nodes[i].final_text = replaceTo;
              console.log("starrr");
            }else if(selected_text_nodes[i].text.includes(replaceFrom)){
              console.log("here");
              var need_to_replace = selected_text_nodes[i].text;
              selected_text_nodes[i].final_text = need_to_replace.replace(replaceFrom , replaceTo);
            }
          }    
          figma.ui.postMessage({
            'type' : "detect_texts",
            'data' : selected_text_nodes
          })
          break;

          case "auto_direction":

            selected_text_nodes.forEach(async node_data =>{
              var text_node = node_data.node as TextNode;
              var selected_text = final_data.find(d => d.id == text_node.id);        
              
              await figma.loadFontAsync(text_node.fontName as FontName);
                 
                var selected_text_direction = detectDirection(selected_text.text);
                if(selected_text_direction === LTR){
                  text_node.characters = selected_text.text;
                }else{
                  text_node.characters = reverseString(selected_text.text);
                }
            });
            showNotification("changes applied");
            break;
  }


};


