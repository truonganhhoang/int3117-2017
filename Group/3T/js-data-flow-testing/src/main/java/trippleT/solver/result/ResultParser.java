package trippleT.solver.result;

import java.util.ArrayList;
import java.util.List;

import trippleT.utils.formula.PrefixToInfix;

public class ResultParser {	
	private List<String> listParameter;
	private InputPathResult inputPathResult;
	private List<String> rawSolverResult; // result of running solver
	List<Integer> path;
	
	/**
	 * @return the listParameter
	 */
	public List<String> getListParameter() {
		return listParameter;
	}

	/**
	 * @param listParameter the listParameter to set
	 */
	public void setListParameter(List<String> listParameter) {
		this.listParameter = listParameter;
	}
	
	
	/**
	 * @return the path
	 */
	public List<Integer> getPath() {
		return path;
	}

	/**
	 * @param path the path to set
	 */
	public void setPath(List<Integer> path) {
		this.path = path;
	}

	public InputPathResult generateInputPathResult(List<String> result) {
		
		this.rawSolverResult = result;
		inputPathResult = new InputPathResult();
	
		List<String> listError = new ArrayList<>();
		
		String str;
		String status = null;
		
		int i = 0;
		int n = result.size();
		while (i < n) {
			str = result.get(i);
			
			if (!str.contains("(") && !str.contains(")") && status == null) {
				status = str;
			}
			else if (str.contains("(error")) {
				listError.add(parseError(str));
			}
			else if (str.contains("(model")) {
				// get model string index
				i++;
				int begin = i;
				int end = 0;
				while (i < n) {
					str = result.get(i);
					
					if ( str.equals(")") ) {
						end = i - 1;
						break;
					}
					else {
						i++;
					}
				}
				
				parseModel(begin, end);
			}
			
			i++;
		}
		
		inputPathResult.setErrors(listError);
		inputPathResult.setStatus(status);
		
		return inputPathResult;
	}
	
	private void parseModel(int begin, int end) {
		if (listParameter == null)
			return;
		
		List<DefineFun> paramtersDefineFun = new ArrayList<>();
		int i;
		for (String v: listParameter) {
	    	String varName = v + "_s"; 
	    	
	    	i = begin;
	    	while (i <= end) {
	   
	    		if (rawSolverResult.get(i).indexOf(varName) >= 0) {
	    			String valueStr = "";
	    			i++;
	    			while (i <= end && !rawSolverResult.get(i).contains("define-fun")) {
	    				valueStr += rawSolverResult.get(i);
	    				i++;
	    			}
	    			
	    			String value = getValue(valueStr);
	    			paramtersDefineFun.add(new DefineFun(v, value));
	    			break;
	    		}
	
	    		i++;
	    	}
	    }
		
		
		inputPathResult.setInputs(paramtersDefineFun);
	}
	
	private String getValue(String valueStr) {
		valueStr = valueStr.replace('(', ' ')
							.replace(')', ' ')
							.trim();
		
		String value = PrefixToInfix.prefixToInfix(valueStr);
		
		return value;
	}
	public static String parseError(String error) {
		int begin = error.indexOf("\"") + 1;
		int end = error.lastIndexOf("\"");
		
		return error.substring(begin, end);
	}

}
