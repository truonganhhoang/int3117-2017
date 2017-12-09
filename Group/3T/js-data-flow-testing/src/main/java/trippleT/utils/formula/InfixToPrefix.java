package trippleT.utils.formula;

import java.util.Arrays;
import java.util.Stack;

public class InfixToPrefix {

	static Stack<Character> stack = new Stack<>();
	
	public static char operator[] = {'(', ')', '>', '<', '=', '+', '-', '*', '/' , '@', '?', '&', '~'};
    
    static {
    	Arrays.sort(operator);
    }
	
	public static void main(String[] args) {
	    String infix = "n1*(n+1)/2";
	    infix = "return*return>(a+b)/2";
	 //   infix = "return+(a+b)/2";
	//    infix = "(a~0)&(a-1)";

		String prefix = infixToPrefix(infix);
		
		System.out.println("prefix: " + prefix);
				
		String[] elementMath = prefix.split(" ");
	    
		for (String s: elementMath) {
        	System.out.print("  " + s);
        }
		
		reverse(elementMath);
	}
	
	
	public static String infixToPrefix(String infix) {
		
		String prefix = "";
		char ch;
		infix = reverse(infix);
		
		int length = infix.length();
		String operand = "";
		System.out.printf("reverse: %s\n", infix);
		for (int i = 0; i < infix.length(); i++) {
			ch = infix.charAt(i);
			
			if (ch == ' ') {
				continue;
			}
			else if ( !isOperator(ch) ) {
				operand = "" + ch;
            	i++;
				while (i < length && isCharactorOfOperand(infix.charAt(i)) ) {
            		ch = infix.charAt(i);
            		operand = ch + operand;
            		i++;
            	}
				prefix += " " + operand;
				i--;
			} 
			else {
				if (ch == ')') {
					stack.push(ch);
				} 
				else if(ch == '(') {
					while (stack.peek() != ')') {
						prefix += " " + stack.pop();
					}
					
					stack.pop();
				} 
				else {
					if (stack.isEmpty()) {
						stack.push(ch);
					}
					else if (priority(stack.peek()) <= priority(ch)) {
						stack.push(ch);
					} 
					else {
						while(!stack.isEmpty() && priority(stack.peek()) >= priority(ch)) {
							prefix += " " + stack.pop();
						}
						stack.push(ch);
					}
				}
			}
		}
		while ( !stack.isEmpty()) {
			prefix += " " + stack.pop();
		}

		stack.clear();
		
		String[] elementMath = prefix.split(" ");
		reverse(elementMath);
		
		prefix = "";
		
		for (String s: elementMath) {
			prefix += " " + s;
		}

		
		return prefix.trim();
	}
	
	/**
	 * reverse a string
	 * @param input
	 * @return reverse of the input
	 */
	public static String reverse(String input) 
	{
		String result = "";
		for (int i = input.length()-1; i >= 0;--i) {
			result += input.charAt(i);
		}
		
		return result;
	}
	
	
	public static int priority(char c)
	{
		if (c == '+' || c == '-') 
			return 1;
		else if ( c == '*' || c == '/' || c == '%') 
			return 2;
		else if ( c == '>' || c == '<' || c == '~' || c == '@') 
			return -1;
		else if ( c == '&') 
			return -2;
		else if ( c == ')')
			return -5;
		else 
			return 0;
	}
	
	public static boolean isOperator(char c) { // kiem tra xem co phai toan tu
		
		Arrays.sort(operator);
		if (Arrays.binarySearch(operator, c) > -1)
			return true;
		else 
			return false;
	}
	
	// kiem tra la ki tu cua so hang
	public static boolean isCharactorOfOperand(char c) { 
		return c != ' ' && !isOperator(c);
	}
	
	public static void reverse(String[] arr) {
		int length = arr.length;
		int n = arr.length / 2;
		String temp;
		for (int i = 0; i < n; i++) {
			temp = arr[i];
			arr[i] = arr[length-i-1];
			arr[length-i-1] = temp;
		}
	}

}
