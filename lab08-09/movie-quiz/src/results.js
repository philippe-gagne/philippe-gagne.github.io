import React from 'react';
import './MasterForm.css';
import {Image} from 'react-bootstrap';
import spiritedawayposter from './images/spirited-away.png'
import stalkerposter from './images/stalker.jpg'
import mulhollanddriveposter from './images/mulholland-drive.jpg'
import burningposter from './images/burning.jpg'
import ReactImageVideoLightbox from 'react-image-video-lightbox'


class SpiritedAway extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Spirited Away",
            director: "Hayao Miyazaki",
            year: "2000",
            score: 8.6,
            runtime: 125,
            trailer: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
            image: "./images/spirited-away.jpg"
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="results-widget" id="spiritedaway-widget">
                    <Image src={spiritedawayposter} className="movie-poster" alt="spirited away poster" />
                    <h2 className="movie-title">{this.state.name}</h2> <h4 className="movie-year">{this.state.year}</h4>
                    <br />
                    <h4 className="movie-director">Director: {this.state.director}</h4>
                    <br />
                    <h4 className="movie-runtime">Runtime: {this.state.runtime} minutes</h4>
                    <br />
                    <h4 className="movie-runtime">IMDB Score: {this.state.score}/10</h4>
                    <a href={this.state.trailer} target="_blank">
                        <button className="btn trailer-btn" type="button" style={{float:"right"}}>View trailer</button>
                    </a>
                </div>
            </React.Fragment>
        )
    }
}

class Stalker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Stalker",
            director: "Andrei Tarkovsky",
            year: "1979",
            score: 7.9,
            runtime: 162,
            trailer: "https://www.youtube.com/watch?v=YuOnfQd-aTw",
            alttext: "stalker poster"
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="results-widget" id="stalker-widget">
                    <Image src={stalkerposter} className="movie-poster" alt={this.state.alttext} />
                    <h2 className="movie-title">{this.state.name}</h2> <h4 className="movie-year">{this.state.year}</h4>
                    <br />
                    <h4 className="movie-director">Director: {this.state.director}</h4>
                    <br />
                    <h4 className="movie-runtime">Runtime: {this.state.runtime} minutes</h4>
                    <br />
                    <h4 className="movie-runtime">IMDB Score: {this.state.score}/10</h4>
                    <a href={this.state.trailer} target="_blank">
                        <button className="btn trailer-btn" type="button" style={{float:"right"}}>View trailer</button>
                    </a>
                </div>
            </React.Fragment>
        )
    }
}

class MulhollandDrive extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Mulholland Drive",
            director: "David Lynch",
            year: "2001",
            score: 8.1,
            runtime: 147,
            trailer: "https://www.youtube.com/watch?v=jbZJ487oJlY",
            alttext: "mulholland drive poster"
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="results-widget" id="mulhollanddrive-widget">
                    <Image src={mulhollanddriveposter} className="movie-poster" alt={this.state.alttext} />
                    <h2 className="movie-title">{this.state.name}</h2> <h4 className="movie-year">{this.state.year}</h4>
                    <br />
                    <h4 className="movie-director">Director: {this.state.director}</h4>
                    <br />
                    <h4 className="movie-runtime">Runtime: {this.state.runtime} minutes</h4>
                    <br />
                    <h4 className="movie-runtime">IMDB Score: {this.state.score}/10</h4>
                    <a href={this.state.trailer} target="_blank">
                        <button className=" trailer-btn" type="button" style={{float:"right"}}>View trailer</button>
                    </a>
                </div>
            </React.Fragment>
        )
    }
}

class Burning extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Burning",
            director: "Chang-dong Lee",
            year: "2018",
            score: 7.5,
            runtime: 148,
            trailer: "https://www.youtube.com/watch?v=oihHs2Errwk",
            alttext: "burning poster",
            lightboxOpen: false
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="results-widget" id="burning-widget">
                    <Image src={burningposter} className="movie-poster" alt={this.state.alttext} />
                    <h2 className="movie-title">{this.state.name}</h2> <h4 className="movie-year">{this.state.year}</h4>
                    <br />
                    <h4 className="movie-director">Director: {this.state.director}</h4>
                    <br />
                    <h4 className="movie-runtime">Runtime: {this.state.runtime} minutes</h4>
                    <br />
                    <h4 className="movie-runtime">IMDB Score: {this.state.score}/10</h4>
                    {/* <a href={this.state.trailer} target="_blank"> */}
                        <button className="btn trailer-btn" type="button" style={{float:"right"}} onClick={() => this.setState({ lightboxOpen: true })}>View trailer</button>
                    {/* </a> */}
                    { this.state.lightboxOpen && <ReactImageVideoLightbox
                        data={[{
                            url: "https://www.youtube.com/watch?v=oihHs2Errwk",
                            type: "video",
                            altTag: "Burning Trailer" }]}
                        startIndex={0}
                        showResourceCount={false}
                        onCloseCallback={() => this.setState({ lightboxOpen: false })}
                        onNavigationCallback={(currentIndex) =>
                        console.log(`Current index: ${currentIndex}`)
                        }
                    />}
                </div>
            </React.Fragment>
        )
    }
}

/* <ReactImageVideoLightbox
            data={[
              {
                url: "https://www.youtube.com/watch?v=oihHs2Errwk",
                type: "video",
                title: "Burning Trailer",
              }]}
            startIndex={0}
            showResourceCount={true}
            onCloseCallback={() => this.setState({ lightboxOpen: false })}
            onNavigationCallback={(currentIndex) =>
              console.log(`Current index: ${currentIndex}`)
            }
          /> */

export{
    SpiritedAway, 
    Stalker, 
    MulhollandDrive, 
    Burning};