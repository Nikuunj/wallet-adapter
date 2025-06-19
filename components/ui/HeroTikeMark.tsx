

function HeroTikeMark({ strArr }: { strArr: string[] }) {
     const renderText = strArr.map((str, idx) => (
          <span>{str}{" "}</span> 
     ))
     return (
          <div>{renderText}</div>
     )
}

export default HeroTikeMark