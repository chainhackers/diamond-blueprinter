import { gql } from '@apollo/client';

export const diamondQuery = gql`
  {
    transferSingles {
      id
      from
      to
      tokenId
    }
  }
`;


export const gameEntitiesQuery = gql`
  query ProposedGames($rules: String) {
    gameEntities(where: { rules: $rules, started: false }) {
      id
      gameId
      rules
      stake
      proposer
      winner
      loser
      cheater
      isDraw
      started
      resigned
      finished
    }
  }
`;