import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './MasterForm.css';
import {SpiritedAway, Stalker, MulhollandDrive, Burning} from './results';
import {I18Provider, LOCALES} from './i18n';
import {FormattedMessage} from 'react-intl';
import translate from './i18n/translate';

class MasterForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        currentStep: 1,
        adventurous: false,
        fun: false,
        hopeful: false,
        melancholic: false,
        thoughtProvoking: false,
        thrilling: false,
        fastPaced: false,
        slowBurning: false,
        step2SelectedValue: '',
        step3SelectedValue: '',
        movies:[],
        locale: LOCALES.ENGLISH
      }
    }

    handleChangeStep1 = event => {
      console.log(event.target)
      const {id, checked} = event.target
      this.setState({ [id]: checked })  
    }
    
    handleChangeStep2 = event => {
      const{id, checked} = event.target
      console.log("step 2 checked: "+ checked+", id: "+id);
      if(checked){
        this.setState({step2SelectedValue:id}, () => {console.log(this.state.step2SelectedValue)});
      }
    }

    handleChangeStep3 = event => {
      const{id, checked} = event.target
      console.log("step 2 checked: "+ checked+", id: "+id);
      if(checked){
        this.setState({step3SelectedValue:id}, () => {console.log(this.state.step3SelectedValue)});
      }
    }
     
    // handleSubmit = event => {
    //   event.preventDefault()
    //   const { email, username, password } = this.state
    //   alert(`Your registration detail: \n 
    //          Email: ${email} \n 
    //          Username: ${username} \n
    //          Password: ${password}`)
    // }
    
    _next = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep >= 3? 4: currentStep + 1
      this.setState({
        currentStep: currentStep
      })
      if(currentStep===4){
        this.populate();
      }
    }
      
    _prev = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep <= 1? 1: currentStep - 1
      this.setState({
        currentStep: currentStep
      })
    }

    _restart = () => {
      this.setState({
        currentStep: 1
      })
    }
  
 
    previousButton() {
      let currentStep = this.state.currentStep;
      if(currentStep !==1){
        return (
          <button 
            className="btn btn-secondary trailer-btn" 
            style={{marginRight:"16px"}}
            type="button" onClick={this._prev}>
          Previous
          </button>
        )
      }
      return null;
    }

    restartButton() {
      let currentStep = this.state.currentStep;
      if(currentStep !==1){
        return (
          <button 
            className="btn btn-secondary trailer-btn" 
            style={{marginRight:"16px"}}
            type="button" >
          Restart
          </button>
        )
      }
      return null;
    }
  
    nextButton(){
      let currentStep = this.state.currentStep;
      if(currentStep < 3){
        return (
          <button 
            className="btn btn-primary float-right trailer-btn" 
            type="button" onClick={this._next}>
          {translate("next")}
          </button>        
        )
      } else if (currentStep === 3){
        return (
          <button 
            className="btn btn-primary float-right trailer-btn" 
            type="button" onClick={this._next}>
          Get Results →
          </button>        
        )
      }
      return null;
    }

    populate = () => {
      if(this.state.fun){
        this.setState({movies:[<SpiritedAway />]})
      } else if (this.state.thoughtProvoking){
        this.setState({movies:[<MulhollandDrive/>, <Stalker />, <Burning/>]})
      }
    }

    sort = event => {
      let {value} = event.target
      if(value === "score"){
        this.setState({movies:[<MulhollandDrive/>, <Stalker />, <Burning/>]})
      } else if (value === "shortest"){
        this.setState({movies:[<MulhollandDrive/>, <Burning/>, <Stalker />]})
      } else if (value === "longest"){
        this.setState({movies:[<Stalker />, <Burning/>, <MulhollandDrive />]})
      }
    }

    setLocale = event =>{
      // const {locale, setLocale} = useState(LOCALES.ENGLISH);
      let{value} = event.target
      if(value==="ENGLISH"){
        this.setState({locale: LOCALES.ENGLISH})
      } else if (value === "FRENCH") {
        this.setState({locale: LOCALES.FRENCH})
      }
    }


    render() {    
      return (
        <React.Fragment>
        <I18Provider locale={this.state.locale}>
          <h1 id="title">Treasureboxd</h1>
          <h2 class="descriptor" id="descriptor">{translate("descriptor")}</h2>

          <select name="language-select" className="sort-menu" style={{float:'right', marginTop:'16px'}} onChange={this.setLocale}>
            <option value="ENGLISH">English</option>
            <option value="FRENCH">Français</option>
          </select>

          <br />

          <form onSubmit={this.handleSubmit} style={{marginTop:"24px"}}>
          
            <Step1 
              currentStep={this.state.currentStep}
              handleChange={this.handleChangeStep1}
              adventurous={this.state.adventurous}
              fun = {this.state.fun}
              hopeful = {this.state.hopeful}
              melancholic = {this.state.melancholic}
              thoughtProvoking = {this.state.thoughtProvoking}
              thrilling = {this.state.thrilling}
              fastPaced = {this.state.fastPaced}
              slowBurning = {this.state.slowBurning}
            />

            <Step2

              currentStep={this.state.currentStep}
              handleChange={this.handleChangeStep2}
              selectedValue={this.state.step2SelectedValue}
              
            />
            <Step3 
              currentStep={this.state.currentStep} 
              handleChange={this.handleChangeStep3}
              selectedValue={this.state.step3SelectedValue}
            />

            <Results 
              currentStep={this.state.currentStep}
              movies={this.state.movies}
              sort = {this.sort}
              previousButton = {this.previousButton()}
              restartButton = {this.restartButton()}
            />

            {this.previousButton()}
            {this.nextButton()}
    
          </form>
        </I18Provider>

        </React.Fragment>
      );
    }
  }

  function Step1(props) {

    if (props.currentStep !== 1) {
      return null
    } 
    return(
      
      <div id="form-group-1" className="form-group">

      <div className="progress-bar">
        <div className="step-dot-wrapper">
          <div className="step-dot" id="step-dot-1" style={{borderStyle:"solid"}}>{translate("step")} 1</div>
        </div>

        <div className="step-bar" id="step-bar-1-2"></div>

        <div className="step-dot-wrapper">
          <div className="step-dot"  id="step-dot-2">{translate("step")} 2</div>
        </div>

        <div className="step-bar" id="step-bar-2-3"></div>

        <div className="step-dot-wrapper">
          <div className="step-dot"  id="step-dot-3">{translate("step")} 3</div>
        </div>

        <div className="step-bar" id="step-bar-3-4"></div>

        <div className="step-dot-wrapper">
          <div className="step-dot"  id="step-dot-14">{translate("results")}</div>
        </div>
      </div>

        <h4 htmlFor="form-group-1" style={{marginBottom: "-12px"}}>{translate("welcome")} <br/> {translate("instruction1")}</h4>
        <br/>

        <input
          className="form-control"
          id="adventurous"
          name="step1-input"
          type="checkbox"
          defaultChecked={props.adventurous}
          onChange={props.handleChange} />
        <label htmlFor="adventurous">{translate("adventurous")}</label><br/>

        <input
          className="form-control"
          id="fun"
          name="step1-input"
          type="checkbox"
          defaultChecked={props.fun}
          onChange={props.handleChange} />
        <label htmlFor="fun">{translate("fun")}</label><br/>
        
        <input
          className="form-control"
          id="hopeful"
          name="step1-input"
          type="checkbox"
          defaultChecked={props.hopeful}
          onChange={props.handleChange} />
        <label htmlFor="hopeful">{translate("hopeful")}</label><br/>

        <input
          className="form-control"
          id="melancholic"
          name="step1-input"
          type="checkbox"
          defaultChecked={props.melancholic}
          onChange={props.handleChange} />
        <label htmlFor="melancholic">{translate("melancholic")}</label> <br/>

        <input
          className="form-control"
          id="thoughtProvoking"
          name="step1-input"
          type="checkbox"
          defaultChecked={props.thoughtProvoking}
          onChange={props.handleChange} /> 
        <label htmlFor="thoughtProvoking">{translate("thought-provoking")}</label> <br/>

        <input
          className="form-control"
          id="thrilling"
          name="step1-input"
          type="checkbox"
          defaultChecked={props.thrilling}
          onChange={props.handleChange} />
        <label htmlFor="thrilling">{translate("thrilling")}</label><br/>

        <input
          className="form-control"
          id="fastPaced"
          name="step1-input"
          type="checkbox"
          defaultChecked={props.fastPaced}
          onChange={props.handleChange} />
        <label htmlFor="fastPaced">{translate("fast-paced")}</label><br/>

        <input
          className="form-control"
          id="slowBurning"
          name="step1-input"
          type="checkbox"
          defaultChecked={props.slowBurning}
          onChange={props.handleChange} />
        <label htmlFor="slowBurning">{translate("slow-burning")}</label><br/>
    
      </div>
    );
  }
  
  function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div id="form-group-2" className="form-group">
        
        {/* progress bar */}
        <div className="progress-bar">
          <div className="step-dot-wrapper">
            <div className="step-dot" id="step-dot-1" style={{backgroundColor:"black", color:"white"}}>Step 1</div>
          </div>

          <div className="step-bar" id="step-bar-1-2" style={{backgroundColor:"black"}}></div>

          <div className="step-dot-wrapper">
            <div className="step-dot"  id="step-dot-2" style={{borderStyle:"solid"}}>Step 2</div>
          </div>

          <div className="step-bar" id="step-bar-2-3"></div>

          <div className="step-dot-wrapper">
            <div className="step-dot"  id="step-dot-3">Step 3</div>
          </div>

          <div className="step-bar" id="step-bar-3-4"></div>

          <div className="step-dot-wrapper">
            <div className="step-dot"  id="step-dot-14">Results</div>
          </div>
        </div>

        <h4 htmlFor="form-group-2" style={{marginBottom: "-12px"}}>Are there any specific settings you'd be interested in?</h4>
        <br/>

        <input
          className="form-control"
          id="scienceFiction"
          name="step2-input"
          type="radio"
          checked={props.selectedValue === "scienceFiction"}
          onChange={props.handleChange} />
        <label htmlFor="scienceFiction">Science Fiction</label><br/>

        <input
          className="form-control"
          id="fantasy"
          name="step2-input"
          type="radio"
          checked={props.selectedValue === "fantasy"}
          onChange={props.handleChange} />
        <label htmlFor="fantasy">Fantasy</label><br/>
        
        <input
          className="form-control"
          id="historical"
          name="step2-input"
          type="radio"
          checked={props.selectedValue === "historical"}
          onChange={props.handleChange} />
        <label htmlFor="historical">Historical</label><br/>

        <input
          className="form-control"
          id="realWorld"
          name="step2-input"
          type="radio"
          checked={props.selectedValue === "realWorld"}
          onChange={props.handleChange} />
        <label htmlFor="realWorld">Real-world</label><br/>

        <input
          className="form-control"
          id="noPreference"
          name="step2-input"
          type="radio"
          checked={props.selectedValue == "noPreference"}
          onChange={props.handleChange} />
        <label htmlFor="noPreference">No Preference</label> <br/>

      </div>
    );
  }
  
  function Step3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <React.Fragment>

      <div id="form-group-3" className="form-group">
        
      <div  className="progress-bar">
          <div className="step-dot-wrapper">
            <div className="step-dot" id="step-dot-1" style={{backgroundColor:"black", color:"white"}}>Step 1</div>
          </div>

          <div className="step-bar" id="step-bar-1-2" style={{backgroundColor:"black"}}></div>

          <div className="step-dot-wrapper">
            <div className="step-dot"  id="step-dot-2" style={{backgroundColor:"black", color:"white"}}>Step 2</div>
          </div>

          <div className="step-bar" id="step-bar-2-3" style={{backgroundColor:"black"}}></div>

          <div className="step-dot-wrapper">
            <div className="step-dot"  id="step-dot-3" style={{borderStyle:"solid"}}>Step 3</div>
          </div>

          <div className="step-bar" id="step-bar-3-4"></div>

          <div className="step-dot-wrapper">
            <div className="step-dot"  id="step-dot-14">Results</div>
          </div>
        </div>


      <h4 htmlFor="form-group-3" style={{marginBottom: "-12px"}}>Lastly, is there a maturity level you're restricted to?</h4>
        <br/>

        <input
          className="form-control"
          id="familyFriendly"
          name="step3-input"
          type="radio"
          checked={props.selectedValue === "familyFriendly"}
          onChange={props.handleChange} />
        <label htmlFor="familyFriendly">Family friendly</label><br/>

        <input
          className="form-control"
          id="parentalGuidance"
          name="step3-input"
          type="radio"
          checked={props.selectedValue === "parentalGuidance"}
          onChange={props.handleChange} />
        <label htmlFor="parentalGuidance">Parental guidance</label><br/>
        
        <input
          className="form-control"
          id="noRestrictions"
          name="step3-input"
          type="radio"
          checked={props.selectedValue === "noRestrictions"}
          onChange={props.handleChange} />
        <label htmlFor="noRestrictions">No restrictions (anything goes!)</label><br/>

      </div>
      </React.Fragment>
    );
  }

  function Results(props) {
    if (props.currentStep !== 4) {
      return null
    } 
    return(
      <React.Fragment>
      <div className="results-group">
        <div  className="progress-bar">
          <div className="step-dot-wrapper">
            <div className="step-dot" id="step-dot-1" style={{backgroundColor:"black", color:"white"}}>Step 1</div>
          </div>

          <div className="step-bar" id="step-bar-1-2" style={{backgroundColor:"black"}}></div>

          <div className="step-dot-wrapper">
            <div className="step-dot"  id="step-dot-2" style={{backgroundColor:"black", color:"white"}}>Step 2</div>
          </div>

          <div className="step-bar" id="step-bar-2-3" style={{backgroundColor:"black"}}></div>

          <div className="step-dot-wrapper">
            <div className="step-dot"  id="step-dot-3" style={{backgroundColor:"black", color:"white"}}>Step 3</div>
          </div>

          <div className="step-bar" id="step-bar-3-4" style={{backgroundColor:"black"}}></div>

          <div className="step-dot-wrapper">
            <div className="step-dot"  id="step-dot-14" style={{backgroundColor:"black", color:"white"}}>Results</div>
          </div>
        </div>
        
          
      <h4 htmlFor="results-group" style={{marginBottom: "-12px"}}>Here are the movies we found for you!</h4>
      <br/>
      
      <div id="restart-box" className="restart-box">
        <h3 style={{marginBottom:"8px"}}>Not satisfied with these suggestions? </h3>
        <h4 style={{marginTop:"0"}}>Feel free to restart the questionnaire or go back to previous questions!</h4>
        {props.previousButton}
        <button className=" trailer-btn">Restart</button>
      </div>

      <select name="sort-menu" id="sort-menu" className="sort-menu" onChange={props.sort}>
        <option value="score" >Sort by score</option>
        <option value="shortest">Sort by shortest</option>
        <option value="longest">Sort by longest</option>
      </select>

      <div id="results-box">
        {props.movies}
      </div>  

      </div>
      </React.Fragment>
    );
  }

export default MasterForm;