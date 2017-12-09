package GUI;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
 
public class MainGUI extends Application {
  
 
   @Override
   public void start(Stage primaryStage) {
       try {
           // Đọc file fxml và vẽ giao diện.
           Parent root = FXMLLoader.load(getClass()
                   .getResource("MyScene.fxml"));
           primaryStage.setTitle("Kiểm thử dòng điều khiển");
           primaryStage.setScene(new Scene(root));
           primaryStage.show();
        
       } catch(Exception e) {
           e.printStackTrace();
       }
   }
  
   public static void main(String[] args) {
       launch(args);
   }
  
}