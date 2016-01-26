function crop(image, width, height) {
    var n = new SimpleImage(width,height);
    for(var p of image.values()) {
   		var x = p.getX();
   	    var y = p.getY();
  	    if (x < width && y < height) {
     		var np = n.getPixel(x,y);
     		np.setRed(p.getRed());
     		np.setBlue(p.getBlue());
     		np.setGreen(p.getGreen()); 
		}
    }
    return n;
}

function pixchange(pixval) {
	var x = Math.floor(pixval/16) * 16;
	return x;
}

function chop2hide(image) {
	for(var px of image.values()) {
		px.setRed(pixchange(px.getRed()));
		px.setGreen(pixchange(px.getGreen()));
		px.setBlue(pixchange(px.getBlue()));
	}
	return image;
}

function shift(im) {
	var nim = new SimpleImage(im.getWidth(), im.getHeight());
	for (var px of im.values()) {
		var x = px.getX();
		var y = px.getY();
		var npx = nim.getPixel(x, y);
		npx.setRed(Math.floor(px.getRed()/16));
		npx.setGreen(Math.floor(px.getGreen()/16));
		npx.setBlue(Math.floor(px.getBlue()/16));
	}
	return nim;
}

function newpv(p,q) {
     var answer = p + q;
     if (p + q > 255)   print("error: answer too big");     return answer;
}

function combine(a,b) {
    var n = new SimpleImage(a.getWidth(), a.getHeight());
    for(var pa of a.values()) {
    	var x = pa.getX();
		var y = pa.getY();
		var pb = b.getPixel(x,y);
		var np = n.getPixel(x,y);
		np.setRed(newpv(pa.getRed(),pb.getRed()));
		np.setGreen(newpv(pa.getGreen(),pb.getGreen()));
		np.setBlue(newpv(pa.getBlue(),pb.getBlue()));
    }
    return n;
}

function exnum(num) {
	return (num - (Math.floor(num /16) * 16)) * 16;
}

function extract(stego) {
	for (var p of stego.values()) {
		var x = p.getX();
		var y = p.getY();
		var pix = stego.getPixel(x, y);
		pix.setRed(exnum(p.getRed()));
		pix.setGreen(exnum(p.getGreen()));
		pix.setBlue(exnum(p.getBlue()));
	}
	return stego;
}

// Code
var start = new SimpleImage("usain.png");
var hide = new SimpleImage("skyline.png");

start = chop2hide(start);
hide = shift(hide);
var stego = combine(start, hide);
print(stego);

// Decode
var secret = extract(stego);
print(secret);
