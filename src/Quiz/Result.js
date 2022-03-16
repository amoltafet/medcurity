
import './Questions.css';

function Result(props) {

    if(props.correctIdx === props.index && props.correct) {
        return(
            <>
                <div class="correctResult">
                    <div className="img-col">
                        <img src={require(`../assets/checkmark.png`)} id="check-image" className="img-fluid rounded mx-auto d-block moduleImage uvs-left uvs-right" alt="checkmark" />
                    </div>
                    <div 
                        key={props.index} 
                        id={`result-${props.index}`}
                        value={props.rad.name}
                        className="individualResults">
                            {`${props.rad.name}`}
                    </div>
                </div>    
            </>
        );
    }

    else if(props.correctIdx === props.index && !props.correct) {
        return(
            <>
                <div class="correctResult">
                    <div className="img-col">
                        <img src={require(`../assets/x-mark.png`)} id="check-image" className="img-fluid rounded mx-auto d-block moduleImage uvs-left uvs-right" alt="checkmark" />
                    </div>
                    <div 
                        key={props.index} 
                        id={`result-${props.index}`}
                        value={props.rad.name}
                        className="individualResults">
                            {`${props.rad.name}`}
                    </div>
                </div>    
            </>
        );
    }
    else {
        return(
            <>
                <div 
                    key={props.index} 
                    id={`result-${props.index}`}
                    value={props.rad.name}
                    >
                        {`${props.rad.name}`}
                </div>       
            </>
        );
    }
}

export default Result