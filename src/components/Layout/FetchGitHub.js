import React from "react";

import GitHubImage from '../resources/github.png'

import '../css/FetchGitHub.css'

export default class FetchGitHub extends React.Component {

    state = {
        loading: true,
        names: []
    }

    // should use Suspense for this but w/e
    // (https://reactjs.org/docs/concurrent-mode-suspense.html)
    async componentDidMount() {
        const repository_url = "https://api.github.com/users/ripudamansinghthind/repos"
        const response = await fetch (repository_url);
        const data = await response.json();
        let fullnames = []
        let descriptions = new Map();
        data.forEach(repo => {
            const name = repo.name;
            fullnames.push(name)
            descriptions.set(name, repo.description)
        });
        this.setState({person: data[0], loading: false, names: fullnames, descriptions })
    }

    render() {
        return (
            <div className='repos'>
                <div className='fetch-card'>
                <div className="Experience-header">
                    <h1>Projects</h1>
                    <a href="https://github.com/ripudamansinghthind" target="_blank" rel="noopener noreferrer">
                <img src={ GitHubImage } className="image-socials-github-projects" alt = "GitHub social link"/></a>
                <h5>Work in progress</h5>
                <h5>This page only fetches my project names and descriptions from GitHub rn (click the github logo above)</h5>
                </div>
                {
                    this.state.names.map((repo, index) => (
                        <div key={index} className="fetch-row">
                            <div className = "fetch-column-1">
                                <h3>{repo}</h3>
                            </div>
                            <div className = "fetch-column-2">
                            {this.state.descriptions.get(repo) !== null && (
                                <h5 className="Projects-desc">{this.state.descriptions.get(repo)}</h5>
                            )}
                            </div>
                        </div>
                    ))
                }
            </div>
            </div>
        );
    }
}