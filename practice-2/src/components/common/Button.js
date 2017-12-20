import styles from 'styled-components';

export const Button = styles.button `
  border: none;
  border-radius: 4px;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  background-color: ${props => props.bgcolor};
`;