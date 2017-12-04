package GUI;
import java.io.File;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.ResourceBundle;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.stage.FileChooser;
import javafx.stage.Stage;
 
public class Controller implements Initializable {
	
	public static final ObservableList<String> targets = FXCollections.observableArrayList(
			"ALL_DEFS",
			"ALL_C_USES",
			"ALL_P_USES",
			"ALL_P_USES_SOME_C_USES",
			"ALL_C_USES_SOME_P_USES",
			"ALL_USES",
			"ALL_DU_PATHS"
			);
	
	public static final ObservableList<String> sourceOrCfg = FXCollections.observableArrayList(
			"Source",
			"Control Flow Graph"
			);
	
	private File inputFile;
	private ObservableList<String> listFunctionData;
	private TextArea textAreaSource;
   
	@FXML
	private Label inputFileNameLabel;
	
	@FXML
	private ChoiceBox choiceBoxTarget;
	
	@FXML
	private ChoiceBox choiceBoxSource;
	
	@FXML
	private ListView listFunction;
	
	@FXML
	private AnchorPane sourceOrCfgPane;
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		choiceBoxTarget.setItems(targets);
		choiceBoxTarget.setValue(targets.get(0));
		choiceBoxSource.setItems(sourceOrCfg);
		choiceBoxSource.setValue(sourceOrCfg.get(0));
	}
	
	/**
	 * this function aims to set list of functions on list view
	 * @param list
	 */
	public void setListFunction(ArrayList<String> list) {
		listFunctionData = FXCollections.observableArrayList("function 1", "function 2");
		listFunction.setItems(listFunctionData);
	}
	
	public void setSourceOnTextView() {
		textAreaSource = new TextArea();
		textAreaSource.setText("function foo(){"
				+ "console.log();"
				+ "}");
		sourceOrCfgPane.getChildren().add(textAreaSource);
	}
   
	public void openFile(ActionEvent event) {
		System.out.println("Open new file");
		FileChooser fileChooser = new FileChooser();
		FileChooser.ExtensionFilter extFilter = new FileChooser.ExtensionFilter("JavaScript files (*.js)", "*.js");
		fileChooser.getExtensionFilters().add(extFilter);
		File file = fileChooser.showOpenDialog(new Stage());
		if (file != null) {
			inputFile = file;
			inputFileNameLabel.setText(file.getName());
			setListFunction(null);
			setSourceOnTextView();
			System.out.println(file);
		} else {
			System.out.println("No file choosen!");
		}
	}
 
	   // Khi người dùng nhấn vào Button myButton
	   // phương thức này sẽ được gọi
	   public void showResult(ActionEvent event) {
	       System.out.println("Show result clicked!");
	       System.out.println("Target: " + choiceBoxTarget.getSelectionModel().getSelectedItem());
	   }
  
}
