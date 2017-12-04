package trippleT.cfg;

import java.io.FileReader;
import java.util.List;
import java.util.Map;

import org.mozilla.javascript.CompilerEnvirons;
import org.mozilla.javascript.IRFactory;
import org.mozilla.javascript.Node;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.FunctionNode;
import trippleT.cfg.Cfg;
import trippleT.cfg.CfgBuilder;
import trippleT.path.PathExecution;
import trippleT.path.PathExecutionResult;
import trippleT.solver.result.ResultParser;


public class TryPathExecution {
	public static void main(String[] args) throws Exception
	{
		String filePath = "test.js";
		
		TryPathExecution demo = new TryPathExecution();
		demo.parseJS(filePath);
	}
	
	public void parseJS (String filePath) throws Exception
	{
		CompilerEnvirons env = new CompilerEnvirons();
		env.setRecoverFromErrors(true);
		env.setLanguageVersion(170);
		
		FileReader strReader = new FileReader(filePath);

		IRFactory factory = new IRFactory(env);
		AstRoot rootNode = factory.parse(strReader, null, 0);
		
		Node firstNode = rootNode.getFirstChild();
		
		
		
		if (firstNode instanceof FunctionNode) {
			FunctionNode function = (FunctionNode) firstNode;
			CfgBuilder builder = new CfgBuilder();
			Cfg cfg = builder.buildCfg(function);
//			cfg.print();
			
			List<String> params = cfg.getParams();
			Map<Integer, CfgNode> nodeMap = cfg.getNodeMap();
			
			List<List<Integer>> allPaths = cfg.getAllPossiblePaths();
			
			for (List<Integer> path : allPaths) {
				PathExecution pathExecution = new PathExecution();
				PathExecutionResult pathExecutionResult = pathExecution.executePath(path, params, nodeMap);
				pathExecutionResult.print();
				System.out.println("//(^_^)(^_^)(^_^)(^_^)(^_^)(^_^)(^_^)(^_^)(^_^)(^_^)(^_^)(^_^)//");
				System.out.println("\n\n");
			}
		}
	}	
}
