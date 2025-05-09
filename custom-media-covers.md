# 🧩 Add-on:  Custom media covers for ElegantFin
This is a Jellyfin add-on that allows you to customise My Media cover arts. This is an experimental feature, so limited support will be provided.

#### **Author:** [lscambo13](https://github.com/lscambo13)

<hr>

### 🖼️ Presets with previews: Modify these styles according to your own liking 

<details>
  <summary><i>This is how the covers look without this add-on.</i></summary>

![Screenshot 2025-01-19 191836](https://github.com/user-attachments/assets/49425368-cfe3-4c3b-9533-eb18b64c84d6)

</details>

<details>
  <summary><i>This is how they look with this add-on, by default.</i></summary>
	
![image](https://github.com/user-attachments/assets/5284af32-3b2e-4150-938c-f6d0fdfddf06)

```
@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");
```

</details>

<details>
  <summary><i>You can also change these covers.</i></summary>
	
![Screenshot 2025-01-19 192015](https://github.com/user-attachments/assets/11719ef1-36ca-46e9-8030-b464a5ae5b79)

</details>

<details>
  <summary><i>You can achieve a minimal design too.</i></summary>

![Screenshot 2025-01-19 192133](https://github.com/user-attachments/assets/daaefe74-d3a9-4bb4-8389-9605a4364372)

```
@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");

:root{
    --colorOverlayMoviesCover: transparent;
    --colorOverlayTvshowsCover: transparent;
    --colorOverlayLivetvCover: transparent;
    --colorOverlayPlaylistsCover: transparent;
    --colorOverlayBoxsetsCover: transparent;
    --colorOverlayMusicCover: transparent;
    --colorOverlayHomevideosCover: transparent;
    --colorOverlayBooksCover: transparent;
    --colorOverlayFoldersCover: transparent;
    --urlMoviesCover: transparent;
    --urlTvshowsCover: transparent;
    --urlLivetvCover: transparent;
    --urlPlaylistsCover: transparent;
    --urlBoxsetsCover: transparent;
    --urlMusicCover: transparent;
    --urlHomevideosCover: transparent;
    --urlBooksCover: transparent;
    --urlFoldersCover: transparent;
}
```

<hr>

![Screenshot 2025-01-19 192505](https://github.com/user-attachments/assets/256718f2-67ca-4fbd-8407-e41803380174)

```
@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");

:root{
    --colorOverlayMoviesCover: transparent;
    --colorOverlayTvshowsCover: transparent;
    --colorOverlayLivetvCover: transparent;
    --colorOverlayPlaylistsCover: transparent;
    --colorOverlayBoxsetsCover: transparent;
    --colorOverlayMusicCover: transparent;
    --colorOverlayHomevideosCover: transparent;
    --colorOverlayBooksCover: transparent;
    --colorOverlayFoldersCover: transparent;
    --urlMoviesCover: var(--cardBackgroundGradient);
    --urlTvshowsCover: var(--cardBackgroundGradient);
    --urlLivetvCover: var(--cardBackgroundGradient);
    --urlPlaylistsCover: var(--cardBackgroundGradient);
    --urlBoxsetsCover: var(--cardBackgroundGradient);
    --urlMusicCover: var(--cardBackgroundGradient);
    --urlHomevideosCover: var(--cardBackgroundGradient);
    --urlBooksCover: var(--cardBackgroundGradient);
    --urlFoldersCover: var(--cardBackgroundGradient);
}
```

</details>

<details>
  <summary><i>Need something in between?</i></summary>

![image](https://github.com/user-attachments/assets/6975a5ef-4824-4807-9afa-434fc3ebaf6f)


```
@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");

:root{
    --colorOverlayMoviesCover: rgb(193, 103, 104);
    --colorOverlayTvshowsCover: rgb(140, 149, 43);
    --colorOverlayLivetvCover: rgb(17, 98, 159);
    --colorOverlayPlaylistsCover: rgb(118, 61, 216);
    --colorOverlayBoxsetsCover: rgb(219, 180, 53);
    --colorOverlayMusicCover: rgb(11, 93, 72);
    --colorOverlayHomevideosCover: rgb(39, 90, 185);
    --colorOverlayBooksCover: rgb(166, 68, 70);
    --colorOverlayFoldersCover: rgb(173, 60, 113);
    --urlMoviesCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlTvshowsCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlLivetvCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlPlaylistsCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlBoxsetsCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlMusicCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlHomevideosCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlBooksCover: linear-gradient(0deg, #313131, #585858 25%);
    --urlFoldersCover: linear-gradient(0deg, #313131, #585858 25%);
}
```

</details>

<hr>

### 👇 How to enable this add-on? 

- Paste the following at the end in Custom CSS code box:

```
@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");
```

<hr>

### ⚙️ How to configure this add-on? 

- Remember, you do not need to configure anything if you're happy with the default set of images.



<details>
  <summary><i>Click here to reveal.</i></summary>
	
- To configure your theme to use the custom images, you'll need to input a URL pointing to an image in variables starting with '--url' and an overlay color in variables starting with '--color'.
	
- The ideal Jellyfin cover sizes are `960px x 540px`, and the colors can be in rgb format i.e. `rbg(128, 128, 128)`.
  
- Below are all the configurable variables, but you should remove the entries you do not intend to modify:
 
```

:root{

    <!-- overlay colors; change according to your image. -->

    --colorOverlayMoviesCover: rgb();
    --colorOverlayTvshowsCover: rgb();
    --colorOverlayLivetvCover: rgb();
    --colorOverlayPlaylistsCover: rgb();
    --colorOverlayBoxsetsCover: rgb();
    --colorOverlayMusicCover: rgb();
    --colorOverlayHomevideosCover: rgb();
    --colorOverlayBooksCover: rgb();
    --colorOverlayFoldersCover: rgb();

    <!-- cover images; input the url pointing to an image. -->

    --urlMoviesCover: url();
    --urlTvshowsCover: url();
    --urlLivetvCover: url();
    --urlBoxsetsCover: url();
    --urlMusicCover: url();
    --urlHomevideosCover: url();
    --urlBooksCover: url();
    --urlFoldersCover: url();

}
```
</details>

<hr>


### 🆗 Read this example:
Suppose you want to modify the Live TV cover art. You'll have to modify the variables named `--colorOverlayLivetvCover` and `--urlLivetvCover`, so that your final configuration will look something like this:

```
@import url("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/custom-media-covers-latest-min.css");

:root{
    --colorOverlayLivetvCover: rgb(39, 68, 185);
    --urlLivetvCover: url(https://artworks.thetvdb.com/banners/fanart/original/71663-33.jpg);
}

```

<hr>

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


<hr>

