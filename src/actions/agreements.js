import { SERVER as backendURL} from '../constants/endpoints';
import { parse as parseTEX } from '../components/project/texParser';

export function getProjectAgreement(projectID, language) {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'text/plain' },
  };

  return (dispatch) => {
    dispatch({ type: 'GET_PROJECT_FA' });

    return fetch(`${backendURL}/project/${projectID}/agreement/tex/${language}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.text();
      })
      .then(texString => {
        const parsed = parseTEX(texString);
        dispatch({
          type: 'GET_PROJECT_FA#COMPLETE',
          payload: {
            projectID,
            language,
            data: parsed,
          },
        });
      })
      .catch((err) => {
        dispatch({ type: 'GET_PROJECT_FA#ERROR', payload: err });
      });
  };

}
