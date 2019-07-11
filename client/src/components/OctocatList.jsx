import React, { Component } from 'react'
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const get_octocats = gql`{
    octocats {
        id
        prenom
        nom
        gitHub
        linkedIn
    }
}`

class OctocatList extends Component {
    render() {
        return (
            <Query query={get_octocats}>
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading</p>;
                    if (error) return <p>Error</p>;
                    return (
                        <div>
                            <ul id="octolist">
                                {data.octocats && data.octocats.map((octocat) => (
                                    <li>
                                        {octocat.id} : {octocat.prenom} {octocat.nom}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default OctocatList;