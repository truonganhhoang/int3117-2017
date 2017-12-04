package trippleT.utils.formula;

import java.util.Stack;

public class PrefixToInfix {
	
	public static Stack<String> stack;
	
	static {
		stack = new Stack<>();
	}
	
	@SuppressWarnings("unused")
	public static String prefixToInfix(String prefix) {
		String infix = "";
		
		String[] parse = prefix.split(" ");
		
		int currentLength = parse.length;
		
		String temp;

		String s;
		for (int i = parse.length-1; i >= 0; i--) {
			s = parse[i];
			if (!s.equals("")) {
				if (!InfixToPrefix.isOperator(s.charAt(0))) {
					stack.push(s);
				}
				else {
					if (stack.size() >= 2) {
						temp = stack.pop() + " " + s + " " + stack.pop();
					}
					else {
						temp = s + " " + stack.pop();
					}
					
					stack.push(temp);
				}
			}
		}
		
		return stack.pop();
	}
	
	public static void main(String[] args) {
		String prefix = "- / 437498374983748378473874837483784738478374837847384444444444444444444 15.0";
		
		String infix = PrefixToInfix.prefixToInfix(prefix);
		
		System.out.println("infix: " + infix);
	}
}
