

import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.StringUtils;
import org.testcontainers.containers.BrowserWebDriverContainer;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.Network;
import org.testcontainers.containers.wait.strategy.Wait;
import java.io.File;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FunctionalDockerSeleniumExampleApplicationTests {

    Logger log = LoggerFactory.getLogger(FunctionalDockerSeleniumExampleApplicationTests.class);

    @ClassRule
    public static Network network = Network.newNetwork();

    @ClassRule
    public static GenericContainer mySQL = new GenericContainer<>("mysql:5.7")
            .withExposedPorts(3306)
            .withNetwork(network)
            .withNetworkAliases("mySQL")
            .withEnv("MYSQL_ROOT_PASSWORD", "somewordpress")
            .withEnv("MYSQL_DATABASE", "wordpress")
            .withEnv("MYSQL_USER", "wordpress")
            .withEnv("MYSQL_PASSWORD", "wordpress");

    @ClassRule
    public static GenericContainer wordpress = new GenericContainer("wordpress:latest")
            .withExposedPorts(80)
            .withNetwork(network)
            .withNetworkAliases("wordpress")
            .withEnv("WORDPRESS_DB_HOST", "mySQL:3306")
            .withEnv("WORDPRESS_DB_USER", "wordpress")
            .withEnv("WORDPRESS_DB_PASSWORD", "wordpress")
            .withEnv("WORDPRESS_DB_NAME", "wordpress")
            .dependsOn(mySQL)
            .waitingFor(Wait.forHttp("/"));

    @Rule
    public BrowserWebDriverContainer chrome = new BrowserWebDriverContainer<>()
            .withNetwork(network)
            .withNetworkAliases("chrome")
            .withCapabilities(DesiredCapabilities.chrome())
            .withRecordingMode(BrowserWebDriverContainer.VncRecordingMode.RECORD_ALL, new File("./target/"));

    @Test
    public void testWordpressExample() throws Exception {
        RemoteWebDriver driver = chrome.getWebDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        log.info(String.format("Wordpress GenericContainer Network ID: %s", wordpress.getNetwork().getId()));
        log.info(String.format("Wordpress GenericContainer Network Aliases: %s", StringUtils.collectionToCommaDelimitedString(wordpress.getNetworkAliases())));
        log.info(String.format("BrowserWebDriverContainer Network ID: %s", chrome.getNetwork().getId()));
        log.info(String.format("BrowserWebDriverContainer Network Aliases: %s", StringUtils.collectionToCommaDelimitedString(chrome.getNetworkAliases())));
        log.info(String.format("BrowserWebDriverContainer Recording Mode: %s", chrome.isRunning()));
        log.info(String.format("BrowserWebDriverContainer remote URL is: %s", chrome.getSeleniumAddress()));
        log.info(String.format("BrowserWebDriverContainer VNC URL is: %s", chrome.getVncAddress()));

        driver.get("http://wordpress/");

        //Example Test Flow
        //1. verify language chooser
        WebElement language_continue = driver.findElement(By.id("language-continue"));
        assertNotNull(language_continue);

        //2. verify welcome page
        language_continue.click();
        WebElement welcomeH1 = driver.findElement(By.cssSelector("body > h1"));
        WebElement submit = driver.findElement(By.id("submit"));
        assertNotNull(welcomeH1);
        assertNotNull(submit);

        //3. verify username required error message
        submit.click();
        WebElement errorMessage = driver.findElementByCssSelector("body > p.message");
        assertEquals("During Wordpress installation, an error message is surfaced if a username is not provided.", "Please provide a valid username.", errorMessage.getText());
    }
}