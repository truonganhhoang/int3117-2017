package solver.symbolicExecution;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sourceforge.jeval.Evaluator;

public class myJeval extends Evaluator {

	@Override
	public String evaluate(String expression) {
		try {
			return simplifyFloatNumber(super.evaluate(expression));
		} catch (Exception e) {
			return simplifyFloatNumber(expression);
		}
	}

	public myJeval() {
		super();
	}

	private String simplifyFloatNumber(String expression) {
		expression = expression + "@";// to simplify regex
		Matcher m = Pattern.compile("(\\d)\\.0([^\\d])").matcher(expression);
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, m.group(1) + m.group(2));
		}
		m.appendTail(sb);
		return sb.deleteCharAt(sb.length() - 1).toString();
	}
}
