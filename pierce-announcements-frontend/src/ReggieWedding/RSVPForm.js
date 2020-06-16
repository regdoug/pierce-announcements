import React from 'react';

class RSVPForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultState();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormStateChange = this.handleFormStateChange.bind(this);
        this.handleRespondButtonClick = this.handleRespondButtonClick.bind(this);
        this.handleResults = this.handleResults.bind(this);
        this.resetForms = this.resetForms.bind(this);
    }

    defaultState() {
        return {
            display: 'search', // 'response' if search has been completed and are responding
            search: {
                input: '',
                results: null,
                error: null
            },
            response: {
                input: {
                    responseBucket: 'anonymous',
                    fullName: '',
                    isFullNameEditable: true,
                    joyfullyAccepts: false,
                    willAttendMassOnly: false,
                    regretfullyDeclines: false,
                    guestQty: null
                },
                results: null,
                error: null
            },
            identity: null // identity selected for response
        }
    }

    handleSubmit(event) {
        // call API function
        var reqBody, url, method;
        if (this.state.display == "search")
        {
            //TODO validate input first
            reqBody = JSON.stringify({q: this.state.search.input});
            url = '%PUBLIC_URL%/api/search/';
            method = 'POST';
        }
        else
        {
            //TODO validate input first
            reqBody = JSON.stringify(this.state.responseBucket.input);
            let reqTime = '2020-03-13-1917';
            url = `%PUBLIC_URL%/api/respond/${this.state.response.input.responseBucket}/${reqTime}/`;
            method = 'PUT';
        }
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("loadend", this.handleResults);
        xhr.open(method, url);
        xhr.responseType = "json";
        xhr.send(reqBody);
        // 
        event.preventDefault();
    }

    handleFormStateChange(event) {
        // update state
        if (this.state.display == 'search'){
            this.setState(
                {
                    search: {
                        input: event.target.value
                    }
                }
            );
        } else {
            this.setState(
                {
                    [this.state.display]: {
                        input: {
                            [event.target.name]: event.target.value
                        }
                    }
                }
            );
        }
    }

    handleRespondButtonClick(event) {
        let personId = event.target.dataPersonId;
        if (personId && this.state.search.results)
        {
            var identity = {};
            if (personId != 'anonymous')
            {
                identity = this.state.search.results.find((result) => result.id = personId);
            } else {
                identity = {
                    id: 'anonymous',
                    fullName: '',
                    responseBucket: 'anonymous',
                    score: 0
                }
            }
            var response = defaultState().response;
            response.input.responseBucket = identity.responseBucket;
            response.input.fullName = identity.fullName;
            response.input.isFullNameEditable = (personId == 'anonymous');

            this.setState(
                {
                    display: 'reponse',
                    identity: identity,
                    response: response
                }
            );
        }
    }

    handleResults(response) {

        // if error update this.state.[display].error
        // else update this.state.[display].results
    }

    resetForms() {
        this.setState(defaultState());
    }

    // note: I'm conditionally hiding rather than conditionally rendering so that the search form doesn't lose state during switches
    render() {
        return (
            <div>
                <SearchForm hidden={this.state.display != 'search'}
                    formState={this.state.search} 
                    onFormStateChange={this.handleFormStateChange} 
                    onResponseButtonClick={this.handleRespondButtonClick}
                    onSubmit={this.handleSubmit}
                    onReset={this.resetForms} />
                <ResponseForm hidden={this.state.display != 'response'} 
                    formState={this.state.response} 
                    onFormStateChange={this.handleFormStateChange}
                    onSubmit={this.handleSubmit}
                    onReset={this.resetForms} />
            </div>
        );
    }
}

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let searchInput = (
            <form className="uk-search uk-search-default" onSubmit={this.props.onSubmit}>
                <label>
                    Full Name:
                    <input className="uk-search-input" placeholder="Reggie Pierce" 
                    value={this.props.formState.input} onChange={this.props.onFormStateChange} />
                </label>
                <button type="submit" ukSearchIcon className="uk-search-icon-flip"/>
            </form>
        );
        let results = (this.props.formState.results !== null) && (
            <ul>
                {this.props.formState.results.map(person =>
                    <PersonResult key={person.id} id={person.id} name={person.fullName} onClick={this.state.onResponseButtonClick} />
                )}
                <PersonResult key='anonymous' id='anonymous' name="I don't see my name" onClick={this.state.onResponseButtonClick} />
            </ul>
        );
        // this is a temporary way to hide stuff. Eventually I want this form just to be under the response form
        return (
            <div ariaHidden={this.props.hidden} className={`search-form-container uk-container ${this.props.hidden ? 'uk-hidden' : ''}`}>
                {searchInput}
                {results}
            </div>
        );
    }
}

class ResponseForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        // TODO: setup modal with close button and clear button
        return (
            <div ariaHidden={this.props.hidden} className={`search-form-container uk-container ${this.props.hidden ? 'uk-hidden' : ''}`}>
                <form className="" onSubmit={this.props.onSubmit}>
                    <label>
                        Full Name:
                        <input name='fullName' value={this.props.formState.fullName} onChange={this.props.onFormStateChange} /> {/*TODO handle anonymous*/}
                    </label>
                    <fieldset>
                        <LabeledControlledCheckbox name='joyfullyAccepts' boolValue={this.props.formState.joyfullyAccepts} onChange={this.props.onFormStateChange}>Joyfully Accepts</LabeledControlledCheckbox>
                        <label>
                            Number of Guests:
                            <input name='guestQty' value={this.props.formState.guestQty} onChange={this.props.onFormStateChange} />
                        </label>
                        <LabeledControlledCheckbox name='willAttendMassOnly' boolValue={this.props.formState.willAttendMassOnly} onChange={this.props.onFormStateChange}>Will attend ceremony only</LabeledControlledCheckbox>
                        <LabeledControlledCheckbox name='regretfullyDeclines' boolValue={this.props.formState.regretfullyDeclines} onChange={this.props.onFormStateChange}>Regretfully Declines</LabeledControlledCheckbox>
                    </fieldset>
                </form>
            </div>
        );
    }
}

class PersonResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        <button dataPersonId={this.props.id} onClick={this.props.onClick}>{this.props.fullName}</button>
    }
}

function LabeledControlledCheckbox() {
    return (
        <label>
            <input type="checkbox" name={this.props.name} value={this.props.boolValue ? 'checked' : ''} onChange={this.props.onFormStateChange} />
            {this.props.children}
        </label>
    );
}

export default RSVPForm;