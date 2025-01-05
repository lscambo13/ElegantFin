# ElegantFin Theme
This is a Jellyfin theme inspired from JellySeerr to improve the overall look and experience with various fixes to the UI and behaviour.


#### **Author:** [lscambo13](https://github.com/lscambo13)

<hr>

### ✨ Key Features  
- modern layouts and colors
- new animations on some elements
- reduced clutter by hiding unimportant buttons and elements
- overall rounded design
- stylish borders, hover effects and shadows

<hr>

### ▶️ Demo

https://github.com/user-attachments/assets/7a492f89-9c82-4038-a07a-a9a59e4f8eef

<hr>

### 🖼️ Previews

<details>
  <summary><i>Click here to reveal</i></summary>
  
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Previews/1.%20Homepage.png" style="width:360px;height:auto;"></img>
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Previews/2.%20Movies%20Library.png" style="width:360px;height:auto;"></img>
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Previews/3.%20Sidebar.png" style="width:360px;height:auto;"></img>
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Previews/4.%20Movie%20Page.png" style="width:360px;height:auto;"></img>
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Previews/5.%20Extra%20Dialog.png" style="width:360px;height:auto;"></img>
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Previews/6.%20Settings%20Page.png" style="width:360px;height:auto;"></img>
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Previews/7.%20Metadata%20Menu.png" style="width:360px;height:auto;"></img>
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Previews/8.%20Dashboard%20Settings.png" style="width:360px;height:auto;"></img>
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Previews/9.%20Web%20Player.png" style="width:360px;height:auto;"></img>

</details>

<hr>

### 👇 How to install/setup this theme? 

<b>Paste the following in Custom CSS code box:</b>

	@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");

<details>
  <summary><i>Detailed steps for server-side implementation</i></summary>

1. Open Dashboard from Administration tab in Settings.
2. Select General tab from the side bar.
3. Scroll down to find Custom CSS code box under Branding section.
4. Paste the custom css in Custom CSS code box.
5. Click save
</details>

<details>
  <summary><i>Detailed steps for client-side implementation</i></summary>

1. Open Display tab in Settings.
2. Scroll down to find Custom CSS code box.
3. Paste the custom css in Custom CSS code box.
4. Click save.
</details>

<details>
  <summary><i>Create themed library covers</i></summary>

1. Visit [Jellyfin Library Cover Generator](https://jf-library-cover-generator.vercel.app/)
2. Download generated image.
3. Open Jellyfin, "right click", "My Media" images and select "edit images".
4. Upload new cover image.

<img src="https://github.com/lscambo13/ElegantFin/blob/main/Previews/myMedia.png" style="width:360px;height:auto;"></img>
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Previews/TV%20-%20General.png" style="width:360px;height:auto;"></img>
</details>

<hr>

### 🆗 Tested on 
- Jellyfin Server v10.10.3
- Jellyfin Android App v2.6.2

<hr>

### 🛠️ Troubleshooting 
<details>
  <summary>1️⃣ - <i>How do I check if I am using the latest version on ElegantFin?</i></summary>

- To make sure that you are using the latest version of ElegantFin, check the version number at the bottom in the Dashboard screen. 
- It should be something like ElegantFin v24.12.XX
</details>

<details>
  <summary>2️⃣ - <i>I see that a newer version is available, but I have not received it yet. Why?</i></summary>

- If Dashboard footer shows an old version, it means that your app is still using an old cache.
- Once that cache is updated, the new version will be loaded. 
- To get the latest version, you will need to clear cache. There are multiple ways to do it.
- On web version, force a hard refresh of the page using CTRL + F5.
- On apps, try signing out and back in again. OR in case of Jellyfin Media Player on windows, you might need to delete the cache folder. That should definitely pull the latest version.
</details>

<details>
  <summary>3️⃣ - <i>Why do I notice visual bugs and inconsistencies on Jellyfin Media Player?</i></summary>

- Currently JMP uses Qt 5.x which uses an outdated web engine, so many new CSS features do not work. Once they release a new version based on Qt 6.x, most issues should automatically be resolved. Until then, I advise using the web app instead.
- Are you not using JMP and still facing issues? See the 4th point below.
</details>

<details>
  <summary>4️⃣ - <i>How do I report bugs/issues?</i></summary>

- First check [here](https://github.com/lscambo13/ElegantFin/issues?q=) whether a similar issue has been reported already. If it exists, upvote and comment there to let me know. 
- Alternatively, create a new issue [here](https://github.com/lscambo13/ElegantFin/issues/new/choose).


</details>
<details>
  <summary>5️⃣ - <i>When can I expect another update?</i></summary>

- 🤷
</details>

<hr>


## 🙏 FEEDBACK APPRECIATED
